import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('v1/catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORIES
  // ─────────────────────────────────────────────────────────────────────────

  @Get('categories')
  async getCategories(@CurrentUser('tenantId') tenantId: string) {
    return this.catalog.getCategoryTree(tenantId);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  async createCategory(@CurrentUser('tenantId') tenantId: string, @Body() data: any) {
    return this.catalog.createCategory(tenantId, data);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────────────────────────────────────────

  @Get('products')
  async listProducts(
    @CurrentUser('tenantId') tenantId: string, 
    @Query('categoryId') categoryId?: string
  ) {
    return this.catalog.listProducts(tenantId, categoryId);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @CurrentUser('id') sellerId: string,
    @CurrentUser('tenantId') tenantId: string,
    @Body() dto: CreateProductDto
  ) {
    return this.catalog.createProduct(tenantId, sellerId, dto);
  }
}
