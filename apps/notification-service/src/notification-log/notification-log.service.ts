import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationLogService {
  private readonly logger = new Logger(NotificationLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    tenantId: string;
    recipientUserId?: string;
    recipientAddress: string;
    channel: string;
    eventType?: string;
    status: string;
  }) {
    return this.prisma.notificationLog.create({
      data: {
        id: uuidv4(),
        ...data,
      },
    });
  }

  async update(id: string, data: {
    status: string;
    provider?: string;
    providerMessageId?: string;
    errorMessage?: string;
    sentAt?: Date;
  }) {
    return this.prisma.notificationLog.update({
      where: { id },
      data,
    });
  }

  async findByTenant(tenantId: string, limit: number = 50) {
    return this.prisma.notificationLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
