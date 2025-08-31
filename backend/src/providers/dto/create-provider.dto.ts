import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsInt, IsUrl, IsJSON } from 'class-validator';
import { ProviderStatus, ProviderType } from '../../entities/provider.entity';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  iconUrl?: string;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsUrl()
  @IsOptional()
  bannerUrl?: string;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsEnum(ProviderType)
  @IsOptional()
  providerType?: ProviderType;

  @IsString()
  @IsOptional()
  countryOfOrigin?: string;

  @IsInt()
  @IsOptional()
  establishedYear?: number;

  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  subscriptionRequired?: boolean;

  @IsString()
  @IsOptional()
  colorCode?: string;

  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @IsEnum(ProviderStatus)
  @IsOptional()
  status?: ProviderStatus;

  @IsUrl()
  @IsOptional()
  apiEndpoint?: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;
}
