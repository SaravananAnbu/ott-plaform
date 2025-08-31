import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../enums/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.USER,
      };

      const mockResult = {
        user: { userId: 1, email: 'test@example.com', role: UserRole.USER },
        token: 'mock-jwt-token',
      };

      authService.register.mockResolvedValue(mockResult as any);

      const result = await controller.register(registerDto);

      expect(result).toBe(mockResult);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockResult = {
        user: { userId: 1, email: 'test@example.com', role: UserRole.USER },
        token: 'mock-jwt-token',
      };

      authService.login.mockResolvedValue(mockResult as any);

      const result = await controller.login(loginDto);

      expect(result).toBe(mockResult);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
