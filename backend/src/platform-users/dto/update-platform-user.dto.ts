import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformUserDto } from './create-platform-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePlatformUserDto extends PartialType(CreatePlatformUserDto) {
  @IsOptional()
  @IsString()
  password?: string; // Make password optional for updates
}
