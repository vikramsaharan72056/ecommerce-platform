import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('v1/orders')
export class OrderController {
  constructor(private readonly order: OrderService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrder(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.order.getOrder(tenantId, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any
  ) {
    return this.order.createOrder(tenantId, userId, dto);
  }

  @Post(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() data: { status: string }
  ) {
    return this.order.updateOrderStatus(tenantId, id, data.status, userId);
  }
}
