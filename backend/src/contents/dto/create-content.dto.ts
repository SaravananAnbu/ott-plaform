import {
  IsString,
  IsEnum,
  IsOptional,
  Length,
  IsNumber,
  IsDateString,
  IsUrl,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ContentCategory, MaturityRating, ContentStatus } from '../../enums';

export class CreateContentDto {
  @IsString()
  @Length(1, 300)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsEnum(ContentCategory)
  category: ContentCategory;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  @Length(1, 40)
  language?: string;

  @IsOptional()
  @IsEnum(MaturityRating)
  maturityRating?: MaturityRating;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  imdbRating?: number;

  @IsOptional()
  @IsUrl()
  posterUrl?: string;

  @IsOptional()
  @IsUrl()
  bannerUrl?: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @IsOptional()
  @IsUrl()
  adUrl?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  director?: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  producer?: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  writer?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  studio?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  countryOfOrigin?: string;

  @IsOptional()
  @IsString()
  tags?: string; // JSON string of tags array

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(18)
  ageRestriction?: number;

  @IsOptional()
  @IsString()
  subtitleLanguages?: string; // JSON string of language codes

  @IsOptional()
  @IsString()
  audioLanguages?: string; // JSON string of language codes

  @IsOptional()
  @IsString()
  @Length(1, 20)
  videoQuality?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  fileSizeMb?: number;

  @IsOptional()
  @IsString()
  contentWarning?: string;

  @IsOptional()
  @IsDateString()
  scheduledReleaseDate?: string;

  @IsOptional()
  @IsNumber()
  playerId?: number;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
