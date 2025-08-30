import { IsEmail, IsOptional, IsString, Length, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  country?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}