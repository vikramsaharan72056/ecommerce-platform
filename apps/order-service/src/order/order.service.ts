import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { ConfigService } from '@nestjs/config';
import { ORDER_EVENT_TYPES, KAFKA_TOPICS, createEvent } from '@ecom/event-schemas';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly config: ConfigService,
  ) {}

  async createOrder(tenantId: string, userId: string, dto: any) {
    // 1. Logic for creating order from cart (Phase 2 logic)
    // For now, simple order creation
    
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          tenantId,
          userId,
          orderNumber: `ORD-${Date.now()}`,
          totalCents: BigInt(dto.totalCents),
          subtotalCents: BigInt(dto.subtotalCents),
          taxCents: BigInt(dto.taxCents),
          shippingCents: BigInt(dto.shippingCents),
          status: 'pending',
          paymentStatus: 'unpaid',
          shippingAddress: dto.shippingAddress,
          items: {
            create: dto.items.map((item: any) => ({
              tenantId,
              productId: item.productId,
              variantId: item.variantId,
              sku: item.sku,
              name: item.name,
              quantity: item.quantity,
              priceCents: BigInt(item.priceCents),
              totalCents: BigInt(item.totalCents),
            })),
          },
        },
        include: { items: true },
      });

      // Emit event
      await this.publishEvent(ORDER_EVENT_TYPES.ORDER_CREATED, tenantId, {
        orderId: order.id,
        orderNumber: order.orderNumber,
        totalCents: Number(order.totalCents),
        userId,
      });

      return order;
    });
  }

  async getOrder(tenantId: string, id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true, history: true },
    });
    if (!order || order.tenantId !== tenantId) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(tenantId: string, id: string, status: string, changedBy: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ where: { id } });
      if (!order) throw new NotFoundException('Order not found');

      const updated = await tx.order.update({
        where: { id },
        data: { status },
      });

      await tx.orderHistory.create({
        data: {
          tenantId,
          orderId: id,
          fromStatus: order.status,
          toStatus: status,
          changedBy,
        },
      });

      await this.publishEvent(ORDER_EVENT_TYPES.ORDER_CONFIRMED, tenantId, {
        orderId: id,
        status,
      });

      return updated;
    });
  }

  private async publishEvent(eventType: any, tenantId: string, payload: any) {
    const env = this.config.get<string>('app.nodeEnv', 'development');
    const event = createEvent(
      eventType,
      'order-service',
      tenantId,
      payload
    );
    await this.kafka.publish(KAFKA_TOPICS.ORDER_EVENTS(env), payload.orderId, event);
  }
}
