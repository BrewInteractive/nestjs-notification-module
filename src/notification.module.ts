import { EmailModule } from './email/email.module';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [EmailModule, SmsModule],
  providers: [
    { provide: 'NotificationService', useClass: NotificationService },
  ],
  exports: ['NotificationService'],
})
export class NotificationModule {}
