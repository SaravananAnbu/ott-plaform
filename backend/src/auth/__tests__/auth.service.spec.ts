import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '../../enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findByPhoneNumber: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user with email', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.USER,
      };

      const mockUser = {
        userId: 1,
        email: 'test@example.com',
        role: UserRole.USER,
        isActive: true,
      };

      userService.findByEmail.mockResolvedValue(null);
      userService.create.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('mocked-token');

      const result = await service.register(registerDto);

      expect(result.user).toBe(mockUser);
      expect(result.token).toBe('mocked-token');
      expect(userService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: expect.any(String), // hashed password
          role: UserRole.USER,
          isActive: true,
        }),
      );
    });

    it('should throw ConflictException if email already exists', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      userService.findByEmail.mockResolvedValue({} as any);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash('password123', 10);
      const mockUser = {
        userId: 1,
        email: 'test@example.com',
        password: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      };

      userService.findByEmail.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('mocked-token');

      const result = await service.login(loginDto);

      expect(result.user).toBe(mockUser);
      expect(result.token).toBe('mocked-token');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      userService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
