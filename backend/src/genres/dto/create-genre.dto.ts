import { 
  IsString, 
  IsOptional, 
  IsBoolean, 
  IsNumber,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @Length(1, 80)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  slug?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'backgroundColor must be a valid hex color code',
  })
  backgroundColor?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'textColor must be a valid hex color code',
  })
  textColor?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  @IsNumber()
  sortOrder?: number = 0;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;
}
