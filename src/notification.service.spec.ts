import {
  EmailConfigFixture,
  EmailFixture,
  SmsConfigFixture,
  SmsFixture,
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

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let emailService: EmailService;
  let smsService: SmsService;
  const mockEmailConfig = MockFactory(EmailConfigFixture).one();
  const mockSmsConfig = MockFactory(SmsConfigFixture).one();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EmailModule,
        SmsModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => mockEmailConfig, () => mockSmsConfig],
        }),
      ],
      providers: [NotificationService],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    emailService = module.get<EmailService>('EmailService');
    smsService = module.get<SmsService>('SmsService');
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should send email', async () => {
    // Arrange
    const mockEmail = MockFactory(EmailFixture).one();

    const emailSpy = jest
      .spyOn(emailService, 'sendEmailAsync')
      .mockResolvedValue();

    // Act
    await notificationService.sendEmail(mockEmail);

    // Assert
    expect(emailSpy).toHaveBeenCalledWith({
      to: mockEmail.to,
      from: mockEmailConfig.emailFrom,
      subject: mockEmail.subject,
      content: mockEmail.content,
      attachments: mockEmail.attachments,
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
});
