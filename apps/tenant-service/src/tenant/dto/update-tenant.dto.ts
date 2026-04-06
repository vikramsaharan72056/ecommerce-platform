import { IsString, MinLength, IsOptional, IsUrl, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTenantDto {
  @ApiPropertyOptional({ example: 'Acme Corp Updated' })
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  locale?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  customDomain?: string;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsObject()
  @IsOptional()
  settings?: Record<string, unknown>;
}
