import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('v1/inventory')
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get(':variantId')
  async getStock(@CurrentUser('tenantId') tenantId: string, @Param('variantId') variantId: string) {
    return this.inventory.getStockByVariant(tenantId, variantId);
  }

  @Post('reserve')
  @UseGuards(JwtAuthGuard)
  async reserve(
    @CurrentUser('tenantId') tenantId: string,
    @Body() data: { orderId: string; items: { variantId: string; quantity: number }[] }
  ) {
    return this.inventory.reserveStock(tenantId, data.orderId, data.items);
  }

  @Post('release')
  @UseGuards(JwtAuthGuard)
  async release(
    @CurrentUser('tenantId') tenantId: string,
    @Body() data: { orderId: string }
  ) {
    return this.inventory.releaseStock(tenantId, data.orderId);
  }

  @Post('deduct')
  @UseGuards(JwtAuthGuard)
  async deduct(
    @CurrentUser('tenantId') tenantId: string,
    @Body() data: { orderId: string }
  ) {
    return this.inventory.deductStock(tenantId, data.orderId);
  }

  @Post('restock')
  @UseGuards(JwtAuthGuard)
  async restock(
    @CurrentUser('tenantId') tenantId: string,
    @Body() data: { variantId: string; quantity: number; sku: string; productId: string }
  ) {
    return this.inventory.restock(tenantId, data.variantId, data.quantity, data.sku, data.productId);
  }
}
