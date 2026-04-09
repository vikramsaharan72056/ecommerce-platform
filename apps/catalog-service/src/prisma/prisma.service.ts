import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from './client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected to Catalog Database');
    } catch (error) {
      this.logger.error('Failed to connect to Catalog Database', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from Catalog Database');
  }

  async cleanDb() {
    if (process.env.NODE_ENV === 'production') return;
    
    // Order matters for deletion
    const models = Reflect.getMetadata('prisma:models', this) || [
      'productMedia',
      'productVariant',
      'product',
      'category',
      'attribute'
    ];
    
    for (const model of models) {
      await this[model].deleteMany();
    }
  }
}
