import { EmailFixture, SendGridConfigFixture } from '../../../../test/fixtures';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFactory } from 'mockingbird';
import { SendgridService } from './sendgrid.service';

const SendgridMail = require('@sendgrid/mail');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('SendgridService', () => {
  let emailService: SendgridService;

  beforeEach(async () => {
    const sendgridConfig = MockFactory(SendGridConfigFixture).one();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: 'SendgridConfig',
          useValue: sendgridConfig,
        },
      ],
    }).compile();

    emailService = module.get<SendgridService>(SendgridService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  it('should send email successfully', async () => {
    // Arrange
    const email = MockFactory(EmailFixture).one();

    // Act
    await emailService.sendEmailAsync(email);

    // Assert
    expect(SendgridMail.send).toHaveBeenCalledWith({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.content,
      cc: email.cc,
      bcc: email.bcc,
      attachments: email.attachments?.map(attachment => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
        encoding: attachment.encoding,
      })),
    });
  });

  it('should send email successfully (option values are not sent)', async () => {
    // Arrange
    const email = MockFactory(EmailFixture).one();
    delete email.cc;
    delete email.bcc;
    delete email.attachments;

    // Act
    await emailService.sendEmailAsync(email);

    // Assert
    expect(SendgridMail.send).toHaveBeenCalledWith({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.content,
      cc: [],
      bcc: [],
      attachments: [],
    });
  });

  it('should send email with attachments successfully', async () => {
    // Arrange
    const email = MockFactory(EmailFixture).one();

    // Act
    await emailService.sendEmailAsync(email);

    // Assert
    expect(SendgridMail.send).toHaveBeenCalledWith({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.content,
      cc: email.cc,
      bcc: email.bcc,
      attachments: email.attachments,
    });
  });

  it('should handle SendGrid error', async () => {
    // Arrange
    const email = MockFactory(EmailFixture).one();
    const error = new Error('SendGrid error');
    SendgridMail.send.mockRejectedValueOnce(error);

    // Act & Assert
    await expect(emailService.sendEmailAsync(email)).rejects.toThrow('SendGrid error');
  });
});
