import { Inject, Injectable } from '@nestjs/common';
import { SendgridConfig } from './sendgrid.config';
import { Email } from '../../dto/email.dto';
import * as SendgridMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor(
    @Inject('SendgridConfig') private readonly sendgridConfig: SendgridConfig,
  ) {}

  async sendEmailAsync(email: Email): Promise<void> {
    SendgridMail.setApiKey(this.sendgridConfig.apiKey);
    await SendgridMail.send({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.content,
      cc: email.cc ?? [],
      bcc: email.bcc ?? [],
      attachments: email.attachments?.map(attachment => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition ?? 'attachment',
        encoding: attachment.encoding,
      })) ?? []
    });
  }
}
