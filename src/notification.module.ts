import { emailConfig, smsConfig, whatsappConfig } from './config';

import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SmsModule } from './sms/sms.module';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    EmailModule,
    SmsModule,
    WhatsappModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig, smsConfig, whatsappConfig],
    }),
  ],
  providers: [
    { provide: 'NotificationService', useClass: NotificationService },
  ],
  exports: ['NotificationService'],
})
export class NotificationModule {}
