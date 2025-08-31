import { IsString, IsEnum, IsOptional, Length, IsNumber } from 'class-validator';
import { ProfileAgeRestriction } from '../enums';

export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsString()
  @Length(1, 100)
  profileName: string;

  @IsString()
  @Length(6, 6)
  pinCode: string;

  @IsOptional()
  @IsEnum(ProfileAgeRestriction)
  ageRestriction?: ProfileAgeRestriction;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}