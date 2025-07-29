import {
  EmailConfigFixture,
  EmailFixture,
  SmsConfigFixture,
  SmsFixture,
  WhatsappConfigFixture,
  WhatsappMessageFixture,
} from '../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { MockFactory } from 'mockingbird';
import { NotificationService } from './notification.service';
import { SmsModule } from './sms/sms.module';
import { SmsService } from './sms/sms.service';
import { classes } from '@automapper/classes';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
describe('NotificationService', () => {
  let notificationService: NotificationService;
  let emailService: EmailService;
  let smsService: SmsService;
  let whatsappService: WhatsappService;
  const mockEmailConfig = MockFactory(EmailConfigFixture).one();
  const mockSmsConfig = MockFactory(SmsConfigFixture).one();
  const mockWhatsappConfig = MockFactory(WhatsappConfigFixture).one();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EmailModule,
        SmsModule,
        WhatsappModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => mockEmailConfig,
            () => mockSmsConfig,
            () => mockWhatsappConfig,
          ],
        }),
      ],
      providers: [NotificationService],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    emailService = module.get<EmailService>('EmailService');
    smsService = module.get<SmsService>('SmsService');
    whatsappService = module.get<WhatsappService>('WhatsappService');
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should send email', async () => {
    // Arrange
    const mockEmail = MockFactory(EmailFixture).one();
    delete mockEmail.from;

    const emailSpy = jest
      .spyOn(emailService, 'sendEmailAsync')
      .mockResolvedValue();

    // Act
    await notificationService.sendEmail(mockEmail);

    // Assert
    expect(emailSpy).toHaveBeenCalledWith({
      from: mockEmailConfig.emailFrom,
      ...mockEmail,
    });
  });

  it('should send sms', async () => {
    // Arrange
    const mockSms = MockFactory(SmsFixture).one();

    const sendSmsAsyncSpy = jest
      .spyOn(smsService, 'sendSmsAsync')
      .mockResolvedValue();

    // Act
    await notificationService.sendSms(mockSms);

    // Assert
    expect(sendSmsAsyncSpy).toHaveBeenCalledWith(mockSms);
  });

  it('should send whatsapp message', async () => {
    // Arrange
    const mockWhatsappMessage = MockFactory(WhatsappMessageFixture).one();

    const sendMessageAsyncSpy = jest
      .spyOn(whatsappService, 'sendMessageAsync')
      .mockResolvedValue();

    // Act
    await notificationService.sendWhatsappMessage(mockWhatsappMessage);

    // Assert
    expect(sendMessageAsyncSpy).toHaveBeenCalledWith(mockWhatsappMessage);
  });
});
