import { Inject, Injectable } from '@nestjs/common';
import { SmsService } from './sms/sms.service';
import { EmailService } from './email/email.service';
import { ConfigService } from '@nestjs/config';
import { Sms } from './sms/dto';
import { Email } from './email/dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('EmailService') private readonly emailService: EmailService,
    @Inject('SmsService') private readonly smsService: SmsService,
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
      to: email.to,
      subject: email.subject,
      content: email.content,
      attachments: email.attachments,
    });
  }
}
