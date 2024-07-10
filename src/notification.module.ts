import { EmailModule } from './email/email.module';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SmsModule } from './sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import { emailConfig, smsConfig } from './config';

@Module({
  imports: [
    EmailModule,
    SmsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig, smsConfig],
    }),
  ],
  providers: [
    { provide: 'NotificationService', useClass: NotificationService },
  ],
  exports: ['NotificationService'],
})
export class NotificationModule {}
