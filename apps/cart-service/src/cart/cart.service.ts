import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { CART_EVENT_TYPES, KAFKA_TOPICS, createEvent } from '@ecom/event-schemas';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  private getCartKey(tenantId: string, id: string): string {
    return `tenant:${tenantId}:cart:${id}`;
  }

  async getCart(tenantId: string, id: string) {
    const key = this.getCartKey(tenantId, id);
    const cartData = await this.redis.get(key);
    
    if (!cartData) {
      return this.createEmptyCart(tenantId, id);
    }

    return JSON.parse(cartData);
  }

  async addItem(tenantId: string, id: string, item: any) {
    const cart = await this.getCart(tenantId, id);
    
    const existingIndex = cart.items.findIndex((i: any) => i.variantId === item.variantId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push({
        itemId: uuidv4(),
        ...item,
        addedAt: new Date().toISOString(),
      });
    }

    await this.calculateAndStore(tenantId, id, cart);
    
    await this.publishEvent(CART_EVENT_TYPES.CART_ITEM_ADDED, tenantId, {
      cartId: cart.cartId,
      variantId: item.variantId,
      quantity: item.quantity,
    });

    return cart;
  }

  async removeItem(tenantId: string, id: string, variantId: string) {
    const cart = await this.getCart(tenantId, id);
    cart.items = cart.items.filter((i: any) => i.variantId !== variantId);
    
    await this.calculateAndStore(tenantId, id, cart);
    return cart;
  }

  async clearCart(tenantId: string, id: string) {
    const key = this.getCartKey(tenantId, id);
    await this.redis.del(key);
    return this.createEmptyCart(tenantId, id);
  }

  private async calculateAndStore(tenantId: string, id: string, cart: any) {
    // 1. Calculate totals
    let subtotal = 0;
    for (const item of cart.items) {
      subtotal += item.unitPriceCents * item.quantity;
    }

    const gstRate = this.config.get<number>('app.billing.gstRate', 0.18);
    const tax = Math.ceil(subtotal * gstRate);
    
    const threshold = this.config.get<number>('app.billing.freeShippingThresholdPaise', 49900);
    const shipping = subtotal >= threshold ? 0 : 4000; // ₹40 shipping

    cart.subtotalCents = subtotal;
    cart.taxCents = tax;
    cart.shippingCents = shipping;
    cart.totalCents = subtotal + tax + shipping;
    cart.updatedAt = new Date().toISOString();

    // 2. Store in Redis
    const key = this.getCartKey(tenantId, id);
    await this.redis.set(key, JSON.stringify(cart), 7 * 24 * 60 * 60); // 7 days TTL

    // 3. Persist to DB (for analytics / recovery)
    await this.prisma.cart.upsert({
      where: { id: cart.cartId }, // This is a simplification; usually unique by tenantId+userId
      update: {
        items: cart.items,
        totalCents: BigInt(cart.totalCents),
        status: 'active',
      },
      create: {
        id: cart.cartId,
        tenantId,
        userId: cart.userId,
        sessionId: cart.sessionId,
        items: cart.items,
        totalCents: BigInt(cart.totalCents),
      }
    }).catch(e => this.logger.error('Failed to persist cart to DB', e));
  }

  private createEmptyCart(tenantId: string, id: string) {
    return {
      cartId: uuidv4(),
      tenantId,
      userId: id.includes('-') ? id : null, // Assuming UUID vs SessionID
      sessionId: !id.includes('-') ? id : null,
      items: [],
      appliedCoupons: [],
      discountCents: 0,
      subtotalCents: 0,
      taxCents: 0,
      shippingCents: 0,
      totalCents: 0,
      currency: 'INR',
      updatedAt: new Date().toISOString(),
    };
  }

  private async publishEvent(eventType: any, tenantId: string, payload: any) {
    const env = this.config.get<string>('app.nodeEnv', 'development');
    const event = createEvent(eventType, 'cart-service', tenantId, payload);
    await this.kafka.publish(KAFKA_TOPICS.CART_EVENTS(env), payload.cartId || 'system', event);
  }
}
