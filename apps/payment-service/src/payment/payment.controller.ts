import { Controller, Get, Post, Body, Param, UseGuards, Headers, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('v1/payments')
export class PaymentController {
  constructor(private readonly payment: PaymentService) {}

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() data: { orderId: string; amountCents: number }
  ) {
    return this.payment.createRazorpayOrder(tenantId, data.orderId, data.amountCents, userId);
  }

  @Post('webhook')
  async handleWebhook(@Headers('x-razorpay-signature') signature: string, @Body() body: any) {
    const isValid = await this.payment.verifySignature(body, signature);
    if (!isValid) throw new BadRequestException('Invalid signature');

    return this.payment.handleWebhook(body);
  }
}
