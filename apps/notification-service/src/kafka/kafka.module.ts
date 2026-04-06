import { Global, Module } from '@nestjs/common';
import { NotificationConsumer } from './notification.consumer';
import { EmailModule } from '../email/email.module';
import { NotificationLogModule } from '../notification-log/notification-log.module';

@Global()
@Module({
  imports: [EmailModule, NotificationLogModule],
  providers: [NotificationConsumer],
  exports: [NotificationConsumer],
})
export class KafkaModule {}
