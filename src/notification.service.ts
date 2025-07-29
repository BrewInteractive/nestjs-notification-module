import { Inject, Injectable } from '@nestjs/common';
import { SmsService } from './sms/sms.service';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
import { Sms } from './sms/dto';
import { Email } from './email/dto';
import { WhatsappMessage } from './whatsapp/dto';
import { WhatsappService } from './whatsapp/whatsapp.service';
@Injectable()
export class NotificationService {
  constructor(
    @Inject('EmailService') private readonly emailService: EmailService,
    @Inject('SmsService') private readonly smsService: SmsService,
    @Inject('WhatsappService') private readonly whatsappService: WhatsappService,
    private readonly configService: ConfigService,
  ) {}
  async sendSms(sms: Sms): Promise<void> {
    await this.smsService.sendSmsAsync({
      message: sms.message,
      phoneNumber: sms.phoneNumber,
    });
  }
  async sendEmail(email: Email): Promise<void> {
    return await this.emailService.sendEmailAsync({
      from: this.configService.get<string>('emailFrom'),
      ...email,
    });
  }
  async sendWhatsappMessage(whatsappMessage: WhatsappMessage): Promise<void> {
    return await this.whatsappService.sendMessageAsync({
      ...whatsappMessage,
    });
  }
}
