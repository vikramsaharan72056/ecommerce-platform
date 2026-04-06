import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { EventPublisher } from '../kafka/event-publisher.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TENANT_EVENT_TYPES, KAFKA_TOPICS, createEvent } from '@ecom/event-schemas';
import { TenantProfile, TenantUsage, FeatureFlag } from '@ecom/shared-types';

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  // Plan limits (from spec)
  private readonly PLAN_LIMITS = {
    free:       { maxProducts: 50,     maxOrdersPerMonth: 100,    maxStaffUsers: 1, maxWarehouses: 1 },
    starter:    { maxProducts: 500,    maxOrdersPerMonth: 1000,   maxStaffUsers: 3, maxWarehouses: 1 },
    pro:        { maxProducts: 10000,  maxOrdersPerMonth: 25000,  maxStaffUsers: 10, maxWarehouses: 5 },
    enterprise: { maxProducts: -1,     maxOrdersPerMonth: -1,     maxStaffUsers: -1, maxWarehouses: -1 }, // unlimited
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventPublisher,
    private readonly config: ConfigService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CREATE TENANT
  // ─────────────────────────────────────────────────────────────────────────

  async create(dto: CreateTenantDto): Promise<TenantProfile> {
    // Check slug uniqueness
    const existing = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Slug '${dto.slug}' is already taken`);

    // Set trial expiry (14 days)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const tenant = await this.prisma.tenant.create({
      data: {
        id: uuidv4(),
        name: dto.name,
        slug: dto.slug.toLowerCase(),
        plan: 'free',
        status: 'trial',
        trialEndsAt,
        billingEmail: dto.billingEmail,
        billingName: dto.billingName,
        timezone: dto.timezone ?? 'UTC',
        locale: dto.locale ?? 'en-IN',
        currency: dto.currency ?? 'INR',
        settings: {},
      },
    });

    // Publish event
    await this.events.publish(
      KAFKA_TOPICS.TENANT_EVENTS(this.getEnv()),
      createEvent(TENANT_EVENT_TYPES.TENANT_CREATED, 'tenant-service', tenant.id, {
        tenantId: tenant.id,
        slug: tenant.slug,
        plan: tenant.plan,
        ownerEmail: dto.billingEmail,
        ownerName: dto.billingName ?? dto.name,
      }),
    );

    this.logger.log(`Tenant created: ${tenant.id} (${tenant.slug})`);
    return this.toTenantProfile(tenant);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // READ
  // ─────────────────────────────────────────────────────────────────────────

  async findById(id: string): Promise<TenantProfile> {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return this.toTenantProfile(tenant);
  }

  async validateSlug(slug: string): Promise<{ available: boolean }> {
    const existing = await this.prisma.tenant.findUnique({ where: { slug: slug.toLowerCase() } });
    return { available: !existing };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateTenantDto): Promise<TenantProfile> {
    const tenant = await this.prisma.tenant.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.timezone && { timezone: dto.timezone }),
        ...(dto.locale && { locale: dto.locale }),
        ...(dto.currency && { currency: dto.currency }),
        ...(dto.customDomain !== undefined && { customDomain: dto.customDomain }),
        ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
        ...(dto.settings && { settings: dto.settings as any }),
      },
    });

    await this.events.publish(
      KAFKA_TOPICS.TENANT_EVENTS(this.getEnv()),
      createEvent(TENANT_EVENT_TYPES.TENANT_UPDATED, 'tenant-service', id, {
        tenantId: id,
        changedFields: Object.keys(dto),
      }),
    );

    return this.toTenantProfile(tenant);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // USAGE
  // ─────────────────────────────────────────────────────────────────────────

  async getUsage(tenantId: string): Promise<TenantUsage> {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    const month = new Date().toISOString().substring(0, 7); // YYYY-MM
    const usage = await this.prisma.tenantUsageLog.findUnique({
      where: { tenantId_month: { tenantId, month } },
    });

    const plan = tenant.plan as keyof typeof this.PLAN_LIMITS;
    const limits = this.PLAN_LIMITS[plan] ?? this.PLAN_LIMITS.free;

    return {
      productCount: usage?.productCount ?? 0,
      orderCountThisMonth: usage?.orderCount ?? 0,
      staffCount: usage?.staffCount ?? 0,
      warehouseCount: usage?.warehouseCount ?? 0,
      limits,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PLAN
  // ─────────────────────────────────────────────────────────────────────────

  async upgradePlan(tenantId: string, newPlan: string, changedBy: string): Promise<TenantProfile> {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    const oldPlan = tenant.plan;
    const updated = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { plan: newPlan, status: 'active' },
    });

    await this.events.publish(
      KAFKA_TOPICS.TENANT_EVENTS(this.getEnv()),
      createEvent(TENANT_EVENT_TYPES.TENANT_PLAN_CHANGED, 'tenant-service', tenantId, {
        tenantId,
        oldPlan,
        newPlan,
        changedBy,
      }),
    );

    return this.toTenantProfile(updated);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SUSPEND / REACTIVATE
  // ─────────────────────────────────────────────────────────────────────────

  async suspend(tenantId: string, reason: string, suspendedBy: string): Promise<void> {
    await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { status: 'suspended' },
    });

    await this.events.publish(
      KAFKA_TOPICS.TENANT_EVENTS(this.getEnv()),
      createEvent(TENANT_EVENT_TYPES.TENANT_SUSPENDED, 'tenant-service', tenantId, {
        tenantId,
        reason,
        suspendedBy,
      }),
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FEATURE FLAGS
  // ─────────────────────────────────────────────────────────────────────────

  async getFeatureFlags(tenantId: string): Promise<FeatureFlag[]> {
    const flags = await this.prisma.tenantFeatureFlag.findMany({ where: { tenantId } });
    return flags.map(this.toFeatureFlag);
  }

  async updateFeatureFlag(
    tenantId: string,
    flagKey: string,
    isEnabled: boolean,
    config: Record<string, unknown> | undefined,
    updatedBy: string,
  ): Promise<FeatureFlag> {
    const flag = await this.prisma.tenantFeatureFlag.upsert({
      where: { tenantId_flagKey: { tenantId, flagKey } },
      create: { id: uuidv4(), tenantId, flagKey, isEnabled, config: config as any, updatedBy },
      update: { isEnabled, config: config as any, updatedBy },
    });

    await this.events.publish(
      KAFKA_TOPICS.TENANT_EVENTS(this.getEnv()),
      createEvent(TENANT_EVENT_TYPES.TENANT_FEATURE_FLAG_CHANGED, 'tenant-service', tenantId, {
        tenantId,
        flagKey,
        isEnabled,
        config,
        changedBy: updatedBy,
      }),
    );

    return this.toFeatureFlag(flag);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PLAN ENFORCEMENT — called by other services
  // ─────────────────────────────────────────────────────────────────────────

  async checkPlanLimit(tenantId: string, resource: 'products' | 'orders' | 'staff' | 'warehouses', currentCount: number): Promise<void> {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    if (tenant.status === 'suspended') {
      throw new ForbiddenException('Tenant is suspended');
    }

    const plan = tenant.plan as keyof typeof this.PLAN_LIMITS;
    const limits = this.PLAN_LIMITS[plan];

    const limitMap = {
      products: limits.maxProducts,
      orders: limits.maxOrdersPerMonth,
      staff: limits.maxStaffUsers,
      warehouses: limits.maxWarehouses,
    };

    const limit = limitMap[resource];
    if (limit !== -1 && currentCount >= limit) {
      throw new ForbiddenException(`Plan limit exceeded for ${resource}. Upgrade your plan.`);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────────────

  private getEnv(): string {
    return this.config.get<string>('app.nodeEnv', 'development');
  }

  private toTenantProfile(tenant: any): TenantProfile {
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      plan: tenant.plan,
      status: tenant.status,
      trialEndsAt: tenant.trialEndsAt?.toISOString(),
      billingEmail: tenant.billingEmail,
      billingName: tenant.billingName,
      timezone: tenant.timezone,
      locale: tenant.locale,
      currency: tenant.currency,
      customDomain: tenant.customDomain,
      logoUrl: tenant.logoUrl,
      settings: tenant.settings,
      createdAt: tenant.createdAt.toISOString(),
      updatedAt: tenant.updatedAt.toISOString(),
    };
  }

  private toFeatureFlag(flag: any): FeatureFlag {
    return {
      id: flag.id,
      tenantId: flag.tenantId,
      flagKey: flag.flagKey,
      isEnabled: flag.isEnabled,
      config: flag.config,
      updatedBy: flag.updatedBy,
      createdAt: flag.createdAt.toISOString(),
    };
  }
}
