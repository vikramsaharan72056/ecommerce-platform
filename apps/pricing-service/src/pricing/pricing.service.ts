import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async listPromotions(tenantId: string) {
    return this.prisma.promotion.findMany({
      where: { tenantId, isActive: true },
      orderBy: { priority: 'desc' },
      include: { coupons: true },
    });
  }

  async getPromotion(tenantId: string, id: string) {
    const promotion = await this.prisma.promotion.findFirst({
      where: { id, tenantId },
      include: { coupons: true },
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion ${id} not found`);
    }

    return promotion;
  }

  async createPromotion(tenantId: string, data: any) {
    return this.prisma.promotion.create({
      data: {
        id: uuidv4(),
        tenantId,
        name: data.name,
        type: data.type,
        appliesTo: data.appliesTo || 'all',
        targetIds: data.targetIds || [],
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderCents: data.minOrderCents ? BigInt(data.minOrderCents) : null,
        maxDiscountCents: data.maxDiscountCents ? BigInt(data.maxDiscountCents) : null,
        startsAt: new Date(data.startsAt),
        endsAt: data.endsAt ? new Date(data.endsAt) : null,
        usageLimit: data.usageLimit,
        usagePerUser: data.usagePerUser,
        priority: data.priority || 0,
        stackable: data.stackable || false,
      },
    });
  }

  async calculateDiscount(tenantId: string, data: { cartTotal: number; couponCode?: string; itemIds?: string[] }) {
    const now = new Date();
    let discountCents = 0;
    const appliedPromotions: string[] = [];

    // Find applicable promotions
    const promotions = await this.prisma.promotion.findMany({
      where: {
        tenantId,
        isActive: true,
        startsAt: { lte: now },
        OR: [{ endsAt: null }, { endsAt: { gte: now } }],
      },
      orderBy: { priority: 'desc' },
    });

    for (const promo of promotions) {
      if (promo.minOrderCents && data.cartTotal < Number(promo.minOrderCents)) continue;

      if (promo.discountType === 'percentage' && promo.discountValue) {
        let discount = Math.floor(data.cartTotal * (Number(promo.discountValue) / 100));
        if (promo.maxDiscountCents) {
          discount = Math.min(discount, Number(promo.maxDiscountCents));
        }
        discountCents += discount;
        appliedPromotions.push(promo.id);
      } else if (promo.discountType === 'fixed' && promo.discountValue) {
        discountCents += Math.floor(Number(promo.discountValue) * 100);
        appliedPromotions.push(promo.id);
      }

      if (!promo.stackable) break;
    }

    return {
      originalCents: data.cartTotal,
      discountCents,
      finalCents: Math.max(0, data.cartTotal - discountCents),
      appliedPromotions,
    };
  }

  async listCoupons(tenantId: string) {
    return this.prisma.coupon.findMany({
      where: { tenantId, isActive: true },
      include: { promotion: true },
    });
  }

  async createCoupon(tenantId: string, data: any) {
    return this.prisma.coupon.create({
      data: {
        id: uuidv4(),
        tenantId,
        promotionId: data.promotionId,
        code: data.code.toUpperCase(),
        description: data.description,
        usageLimit: data.usageLimit,
        usagePerUser: data.usagePerUser || 1,
      },
    });
  }
}
