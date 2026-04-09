import { Injectable, Logger, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CATALOG_EVENT_TYPES, KAFKA_TOPICS, createEvent } from '@ecom/event-schemas';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly config: ConfigService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORIES
  // ─────────────────────────────────────────────────────────────────────────

  async createCategory(tenantId: string, data: any) {
    const slug = data.slug || slugify(data.name, { lower: true });
    
    const exists = await this.prisma.category.findUnique({
      where: { 
        tenantId_slug: { tenantId, slug } 
      }
    });
    if (exists) throw new ConflictException('Category slug already exists');

    const category = await this.prisma.category.create({
      data: {
        id: uuidv4(),
        tenantId,
        parentId: data.parentId,
        name: data.name,
        slug,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder || 0,
      }
    });

    return category;
  }

  async getCategoryTree(tenantId: string) {
    const all = await this.prisma.category.findMany({
      where: { tenantId, isActive: true },
      orderBy: { sortOrder: 'asc' }
    });

    // Helper to build tree
    const buildTree = (parentId: string | null = null) => {
      return all
        .filter(c => c.parentId === parentId)
        .map(c => ({
          ...c,
          children: buildTree(c.id)
        }));
    };

    return buildTree(null);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────────────────────────────────────────

  async createProduct(tenantId: string, sellerId: string, dto: CreateProductDto) {
    const slug = slugify(dto.name, { lower: true });

    // Check slug collision
    const exists = await this.prisma.product.findUnique({
      where: { tenantId_slug: { tenantId, slug } }
    });
    if (exists) throw new ConflictException('Product slug already exists for this tenant');

    // Create via transaction
    const product = await this.prisma.$transaction(async (tx) => {
      const p = await tx.product.create({
        data: {
          id: uuidv4(),
          tenantId,
          sellerId,
          categoryId: dto.categoryId,
          name: dto.name,
          slug,
          description: dto.description,
          type: dto.type,
          tags: dto.tags || [],
          status: 'active', // For dev quick start
        }
      });

      // Simple variants if provided
      if (dto.variants && dto.variants.length > 0) {
        await Promise.all(dto.variants.map(v => 
          tx.productVariant.create({
            data: {
              id: uuidv4(),
              productId: p.id,
              tenantId,
              sku: v.sku,
              name: v.name,
              mrpCents: BigInt(v.mrpCents),
              sellingPriceCents: BigInt(v.sellingPriceCents),
              compareAtPriceCents: v.compareAtPriceCents ? BigInt(v.compareAtPriceCents) : null,
              isActive: true
            }
          })
        ));
      }

      return p;
    });

    // Publish event
    const env = this.config.get<string>('app.nodeEnv', 'development');
    const catalogEvent = createEvent(
      CATALOG_EVENT_TYPES.PRODUCT_CREATED,
      'catalog-service',
      tenantId,
      {
        productId: product.id,
        tenantId,
        sellerId,
        categoryId: product.categoryId,
        name: product.name,
        status: product.status,
      }
    );

    await this.kafka.publish(KAFKA_TOPICS.CATALOG_EVENTS(env), catalogEvent);

    return product;
  }

  async listProducts(tenantId: string, categoryId?: string) {
    return this.prisma.product.findMany({
      where: { 
        tenantId, 
        ...(categoryId && { categoryId }),
        status: 'active' 
      },
      include: {
        variants: true,
        category: { select: { name: true, slug: true } }
      }
    });
  }
}
