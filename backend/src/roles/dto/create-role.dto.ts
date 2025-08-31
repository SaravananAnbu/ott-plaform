import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @IsOptional()
  @IsBoolean()
  isSystemRole?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
