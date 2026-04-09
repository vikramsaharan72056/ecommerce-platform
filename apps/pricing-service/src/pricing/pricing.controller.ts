import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('v1/pricing')
export class PricingController {
  constructor(private readonly pricing: PricingService) {}

  @Get('promotions')
  @UseGuards(JwtAuthGuard)
  async listPromotions(@CurrentUser('tenantId') tenantId: string) {
    return this.pricing.listPromotions(tenantId);
  }

  @Post('promotions')
  @UseGuards(JwtAuthGuard)
  async createPromotion(@CurrentUser('tenantId') tenantId: string, @Body() data: any) {
    return this.pricing.createPromotion(tenantId, data);
  }

  @Get('promotions/:id')
  @UseGuards(JwtAuthGuard)
  async getPromotion(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.pricing.getPromotion(tenantId, id);
  }

  @Post('calculate')
  async calculateDiscount(
    @CurrentUser('tenantId') tenantId: string,
    @Body() data: { cartTotal: number; couponCode?: string; itemIds?: string[] },
  ) {
    return this.pricing.calculateDiscount(tenantId, data);
  }

  @Get('coupons')
  @UseGuards(JwtAuthGuard)
  async listCoupons(@CurrentUser('tenantId') tenantId: string) {
    return this.pricing.listCoupons(tenantId);
  }

  @Post('coupons')
  @UseGuards(JwtAuthGuard)
  async createCoupon(@CurrentUser('tenantId') tenantId: string, @Body() data: any) {
    return this.pricing.createCoupon(tenantId, data);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'pricing-service' };
  }
}
