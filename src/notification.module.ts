import { emailConfig, smsConfig } from './config';

import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SmsModule } from './sms/sms.module';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    EmailModule,
    SmsModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
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
