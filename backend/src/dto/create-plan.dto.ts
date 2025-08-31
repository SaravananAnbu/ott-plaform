import { IsString, IsNumber, IsBoolean, IsOptional, Length, Min } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @Length(1, 60)
  planName: string;

  @IsNumber()
  @Min(0)
  priceCents: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsString()
  @Length(1, 10)
  resolution: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  screensAllowed?: number;

  @IsOptional()
  @IsBoolean()
  downloadsAllowed?: boolean;
}