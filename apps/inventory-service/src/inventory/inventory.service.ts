import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { ConfigService } from '@nestjs/config';
import { INVENTORY_EVENT_TYPES, KAFKA_TOPICS, createEvent } from '@ecom/event-schemas';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly config: ConfigService,
  ) {}

  async getStockByVariant(tenantId: string, variantId: string) {
    const stock = await this.prisma.stock.findFirst({
      where: { tenantId, variantId },
    });

    if (!stock) {
      throw new NotFoundException(`Stock not found for variant ${variantId}`);
    }

    return stock;
  }

  async reserveStock(tenantId: string, orderId: string, items: { variantId: string; quantity: number }[]) {
    return this.prisma.$transaction(async (tx) => {
      const reservations = [];

      for (const item of items) {
        // 1. Check & Update stock
        const stock = await tx.stock.findFirst({
          where: { tenantId, variantId: item.variantId },
        });

        if (!stock || stock.availableQuantity < item.quantity) {
          throw new BadRequestException(`Insufficient stock for variant ${item.variantId}`);
        }

        // 2. Atomically decrement available and increment reserved
        const updatedStock = await tx.stock.update({
          where: { id: stock.id },
          data: {
            availableQuantity: { decrement: item.quantity },
            reservedQuantity: { increment: item.quantity },
          },
        });

        // 3. Create reservation record
        const reservation = await tx.stockReservation.create({
          data: {
            tenantId,
            stockId: stock.id,
            orderId,
            quantity: item.quantity,
            status: 'pending',
            expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 min expiry
          },
        });

        // 4. Audit trail
        await tx.stockTransaction.create({
          data: {
            tenantId,
            stockId: stock.id,
            type: 'reservation',
            quantity: item.quantity,
            referenceId: orderId,
            reason: `Reservation for order ${orderId}`,
          },
        });

        reservations.push(reservation);

        // 5. Emit event
        await this.publishEvent(INVENTORY_EVENT_TYPES.INVENTORY_RESERVED, tenantId, {
          orderId,
          variantId: item.variantId,
          quantity: item.quantity,
          newAvailable: updatedStock.availableQuantity,
          newReserved: updatedStock.reservedQuantity,
        });
      }

      return reservations;
    });
  }

  async releaseStock(tenantId: string, orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const reservations = await tx.stockReservation.findMany({
        where: { tenantId, orderId, status: 'pending' },
      });

      for (const res of reservations) {
        // 1. Update stock
        const updatedStock = await tx.stock.update({
          where: { id: res.stockId },
          data: {
            availableQuantity: { increment: res.quantity },
            reservedQuantity: { decrement: res.quantity },
          },
        });

        // 2. Update reservation status
        await tx.stockReservation.update({
          where: { id: res.id },
          data: { status: 'cancelled' },
        });

        // 3. Audit trail
        await tx.stockTransaction.create({
          data: {
            tenantId,
            stockId: res.stockId,
            type: 'release',
            quantity: res.quantity,
            referenceId: orderId,
            reason: `Release for order ${orderId}`,
          },
        });

        // 4. Emit event
        await this.publishEvent(INVENTORY_EVENT_TYPES.INVENTORY_RELEASED, tenantId, {
          orderId,
          stockId: res.stockId,
          quantity: res.quantity,
          newAvailable: updatedStock.availableQuantity,
          newReserved: updatedStock.reservedQuantity,
        });
      }
    });
  }

  async deductStock(tenantId: string, orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const reservations = await tx.stockReservation.findMany({
        where: { tenantId, orderId, status: 'pending' },
      });

      for (const res of reservations) {
        // 1. Permanently deduct from reserved (it was already removed from available during reservation)
        const updatedStock = await tx.stock.update({
          where: { id: res.stockId },
          data: {
            reservedQuantity: { decrement: res.quantity },
          },
        });

        // 2. Fulfill reservation record
        await tx.stockReservation.update({
          where: { id: res.id },
          data: { status: 'fulfilled' },
        });

        // 3. Audit trail
        await tx.stockTransaction.create({
          data: {
            tenantId,
            stockId: res.stockId,
            type: 'deduction',
            quantity: res.quantity,
            referenceId: orderId,
            reason: `Fulfillment for order ${orderId}`,
          },
        });

        // 4. Emit event
        await this.publishEvent(INVENTORY_EVENT_TYPES.INVENTORY_DEDUCTED, tenantId, {
          orderId,
          stockId: res.stockId,
          quantity: res.quantity,
          newAvailable: updatedStock.availableQuantity,
          newReserved: updatedStock.reservedQuantity,
        });
        
        // 5. Low stock alert
        if (updatedStock.availableQuantity <= updatedStock.safetyStock) {
           await this.publishEvent(INVENTORY_EVENT_TYPES.LOW_STOCK_ALERT, tenantId, {
             stockId: res.stockId,
             available: updatedStock.availableQuantity,
             safety: updatedStock.safetyStock
           });
        }
      }
    });
  }

  async restock(tenantId: string, variantId: string, quantity: number, sku: string, productId: string) {
    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.upsert({
        where: { tenantId_sku: { tenantId, sku } },
        update: {
          availableQuantity: { increment: quantity },
        },
        create: {
          tenantId,
          sku,
          productId,
          variantId,
          availableQuantity: quantity,
          reservedQuantity: 0,
          safetyStock: 5,
        },
      });

      await tx.stockTransaction.create({
        data: {
          tenantId,
          stockId: stock.id,
          type: 'addition',
          quantity: quantity,
          reason: 'Manual restocking',
        },
      });

      await this.publishEvent(INVENTORY_EVENT_TYPES.INVENTORY_RESTOCKED, tenantId, {
        variantId,
        added: quantity,
        newAvailable: stock.availableQuantity,
      });

      return stock;
    });
  }

  private async publishEvent(eventType: any, tenantId: string, payload: any) {
    const env = this.config.get<string>('app.nodeEnv', 'development');
    const event = createEvent(
      eventType,
      'inventory-service',
      tenantId,
      payload
    );
    await this.kafka.publish(KAFKA_TOPICS.INVENTORY_EVENTS(env), payload.variantId || payload.stockId || 'system', event);
  }
}
