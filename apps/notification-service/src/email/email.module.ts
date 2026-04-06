import { Module } from '@nestjs/common';
import { EmailDispatchService } from './email-dispatch.service';
import { NotificationLogModule } from '../notification-log/notification-log.module';

@Module({
  imports: [NotificationLogModule],
  providers: [EmailDispatchService],
  exports: [EmailDispatchService],
})
export class EmailModule {}
