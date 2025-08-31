import { IsNumber, IsDateString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { SubscriptionStatus } from '../enums';

export class CreateSubscriptionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  planId: number;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;
}