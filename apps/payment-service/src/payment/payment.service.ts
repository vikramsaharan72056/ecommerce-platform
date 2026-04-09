import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { ConfigService } from '@nestjs/config';
import * as Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private razorpay: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly config: ConfigService,
  ) {
    this.razorpay = new Razorpay({
      key_id: this.config.get<string>('app.razorpay.keyId'),
      key_secret: this.config.get<string>('app.razorpay.keySecret'),
    });
  }

  async createRazorpayOrder(tenantId: string, orderId: string, amountCents: number, userId: string) {
    try {
      const options = {
        amount: amountCents, // Razorpay takes amount in paise (lowest unit)
        currency: 'INR',
        receipt: orderId,
        notes: { tenantId, userId, orderId },
      };

      const rzpOrder = await this.razorpay.orders.create(options);

      // Create internal payment record
      await this.prisma.payment.create({
        data: {
          tenantId,
          orderId,
          userId,
          amountCents: BigInt(amountCents),
          status: 'pending',
          provider: 'razorpay',
          providerOrderId: rzpOrder.id,
        },
      });

      return rzpOrder;
    } catch (error) {
      this.logger.error('Failed to create Razorpay order', error);
      throw new BadRequestException('Payment initialization failed');
    }
  }

  async verifySignature(body: any, signature: string) {
    const webhookSecret = this.config.get<string>('app.razorpay.webhookSecret');
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(body))
      .digest('hex');

    return expectedSignature === signature;
  }

  async handleWebhook(event: any) {
    const { payload } = event;
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;
    const status = event.event; // e.g. 'payment.captured'

    this.logger.log(`Handling Razorpay webhook: ${status} for ${paymentId}`);

    if (status === 'payment.captured') {
      await this.updatePaymentStatus(orderId, 'captured', paymentId);
    } else if (status === 'payment.failed') {
      await this.updatePaymentStatus(orderId, 'failed', paymentId);
    }
  }

  private async updatePaymentStatus(providerOrderId: string, status: string, providerPaymentId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { providerOrderId },
    });

    if (!payment) {
      this.logger.warn(`Payment record not found for provider order ${providerOrderId}`);
      return;
    }

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status,
        providerPaymentId,
      },
    });

    // Emit event for Order service to update order status
    await this.kafka.publish('payment-events', payment.orderId, {
      eventType: `payment.${status}`,
      tenantId: payment.tenantId,
      orderId: payment.orderId,
      paymentId: payment.id,
      amountCents: Number(payment.amountCents),
    });
  }
}
