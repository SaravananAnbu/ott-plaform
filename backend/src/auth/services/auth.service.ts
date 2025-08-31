import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../enums/user-role.enum';

interface CreateUserForAuthDto {
  email?: string;
  phoneNumber?: string;
  password: string;
  country?: string;
  role?: UserRole;
  isActive?: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; token: string }> {
    const { email, phoneNumber, password, country, role } = registerDto;

    // Check if user already exists
    if (email) {
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    if (phoneNumber) {
      const existingUser =
        await this.userService.findByPhoneNumber(phoneNumber);
      if (existingUser) {
        throw new ConflictException(
          'User with this phone number already exists',
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userService.create({
      email,
      phoneNumber,
      password: hashedPassword,
      country,
      role,
      isActive: true,
    } as CreateUserForAuthDto);

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const { email, phoneNumber, password } = loginDto;

    // Find user by email or phone number
    let user: User | null = null;
    if (email) {
      user = await this.userService.findByEmail(email);
    } else if (phoneNumber) {
      user = await this.userService.findByPhoneNumber(phoneNumber);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new BadRequestException('User has no password set');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is deactivated');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return this.jwtService.sign(payload);
  }
}
