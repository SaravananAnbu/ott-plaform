import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  Length,
  Min,
  Max,
} from 'class-validator';
import { PlanType, PlanStatus } from '../entities/plan.entity';

export class CreatePlanDto {
  @IsString()
  @Length(1, 60)
  planName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  priceCents: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string = 'USD';

  @IsOptional()
  @IsEnum(PlanType)
  type?: PlanType = PlanType.BASIC;

  @IsString()
  @Length(1, 10)
  resolution: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  screensAllowed?: number = 1;

  @IsOptional()
  @IsBoolean()
  downloadsAllowed?: boolean = true;

  @IsOptional()
  @IsBoolean()
  adsSupported?: boolean = true;

  @IsOptional()
  @IsBoolean()
  offlineViewing?: boolean = false;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  maxDownloadQuality?: string;

  @IsString()
  @Length(1, 10)
  streamingQuality: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  contentAccessLevel?: string = 'basic';

  @IsOptional()
  @IsNumber()
  @Min(1)
  simultaneousStreams?: number = 1;

  @IsOptional()
  @IsBoolean()
  familySharing?: boolean = false;

  @IsOptional()
  @IsBoolean()
  parentalControls?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  billingCycleMonths?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(30)
  freeTrialDays?: number = 0;

  @IsOptional()
  @IsEnum(PlanStatus)
  status?: PlanStatus = PlanStatus.ACTIVE;

  @IsOptional()
  @IsBoolean()
  isPopular?: boolean = false;

  @IsOptional()
  @IsNumber()
  sortOrder?: number = 0;
}
