import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('v1/cart')
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  async getCart(@CurrentUser('tenantId') tenantId: string, @CurrentUser('id') userId: string, @Req() req: Request) {
    const id = userId || req.headers['x-session-id'] as string || 'guest';
    return this.cart.getCart(tenantId, id);
  }

  @Post('items')
  async addItem(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Body() item: any
  ) {
    const id = userId || req.headers['x-session-id'] as string || 'guest';
    return this.cart.addItem(tenantId, id, item);
  }

  @Delete('items/:variantId')
  async removeItem(
    @CurrentUser('tenantId') tenantId: string, 
    @CurrentUser('id') userId: string, 
    @Req() req: Request,
    @Param('variantId') variantId: string
  ) {
    const id = userId || req.headers['x-session-id'] as string || 'guest';
    return this.cart.removeItem(tenantId, id, variantId);
  }

  @Delete()
  async clearCart(@CurrentUser('tenantId') tenantId: string, @CurrentUser('id') userId: string, @Req() req: Request) {
    const id = userId || req.headers['x-session-id'] as string || 'guest';
    return this.cart.clearCart(tenantId, id);
  }
}
