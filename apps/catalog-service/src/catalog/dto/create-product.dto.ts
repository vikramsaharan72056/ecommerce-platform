import { IsString, IsNotEmpty, IsOptional, IsArray, IsEnum, IsBoolean, IsInt, IsUUID, IsJSON, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ProductVariantDto {
  @ApiProperty({ example: 'IPH15-BLK-256' })
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @ApiPropertyOptional({ example: 'iPhone 15 Pro - Black - 256GB' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 999900 }) // In paise / cents
  @IsInt()
  mrpCents!: number;

  @ApiProperty({ example: 899000 })
  @IsInt()
  sellingPriceCents!: number;

  @ApiPropertyOptional({ example: 950000 })
  @IsInt()
  @IsOptional()
  compareAtPriceCents?: number;

  @ApiPropertyOptional({ example: {} })
  @IsJSON()
  @IsOptional()
  attributes?: string; // JSON string for attributes
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'electronics' })
  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;

  @ApiPropertyOptional({ example: 'The latest flagship from Apple' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'simple' })
  @IsEnum(['simple', 'variable', 'bundle', 'digital'])
  type: string = 'simple';

  @ApiPropertyOptional({ isArray: true, type: ProductVariantDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  @IsOptional()
  variants?: ProductVariantDto[];

  @ApiPropertyOptional({ example: ['tech', 'mobile'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
