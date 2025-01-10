import { Email } from '../../../src/email/dto/email.dto';
import { Mock } from 'mockingbird';

class AttachmentFixture {
  @Mock((faker) => faker.lorem.lines())
  content: string;
  @Mock((faker) => faker.lorem.lines())
  filename: string;
  @Mock((faker) => faker.lorem.lines())
  type: string;
  @Mock((faker) => faker.lorem.lines())
  disposition: string;
}

export class EmailFixture extends Email {
  @Mock((faker) => faker.internet.email())
  from: string;
  @Mock((faker) => faker.internet.email())
  to: string;
  @Mock({ type: String, count: 3 })
  cc: Array<string>;
  @Mock({ type: String, count: 3 })
  bcc: Array<string>;
  @Mock((faker) => faker.lorem.lines())
  subject: string;
  @Mock((faker) => faker.lorem.lines())
  content: string;
  @Mock({ type: AttachmentFixture, count: 1 })
  attachments: Array<AttachmentFixture>;
}
