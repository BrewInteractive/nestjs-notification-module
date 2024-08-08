import { Mock } from 'mockingbird';
import { MetaWhatsappConfig } from '../../../src/whatsapp/providers/meta';

export class MetaWhatsappConfigFixture extends MetaWhatsappConfig {
  @Mock((faker) => faker.lorem.word())
  metaApiUrl: string;
  @Mock((faker) => faker.lorem.word())
  token: string;
}
