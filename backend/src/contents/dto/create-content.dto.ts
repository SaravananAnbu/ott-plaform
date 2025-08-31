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
  @IsNumber()
  playerId?: number;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
