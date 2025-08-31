import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  Length,
  IsUrl,
} from 'class-validator';
import { UserStatus } from '../entities/platform-user.entity';

export class CreatePlatformUserDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phoneNumber?: string;

  @IsOptional()
  @IsUrl()
  profilePictureUrl?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  department?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  employeeId?: string;

  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus = UserStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean = false;

  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean = false;
}
