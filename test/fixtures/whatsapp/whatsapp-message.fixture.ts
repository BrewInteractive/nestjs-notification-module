import { Mock } from 'mockingbird';
import { WhatsappMessage } from '../../../src/whatsapp/dto';

export class WhatsappMessageFixture extends WhatsappMessage {
  @Mock((faker) => faker.random.words())
  messagingProduct: string;
  @Mock((faker) => faker.phone.phoneNumber())
  to: string;
  @Mock((faker) => faker.lorem.word())
  type: string;
}

export class LanguageFixture {
  @Mock((faker) => faker.lorem.word())
  code: string;
}

export class ComponentFixture {
  @Mock((faker) => faker.lorem.word())
  type: string;
  @Mock((faker) => faker.lorem.word())
  text: string;
}

export class TemplateFixture {
  @Mock((faker) => faker.lorem.word())
  name: string;
  @Mock(LanguageFixture)
  language: LanguageFixture;
  @Mock(ComponentFixture)
  components: [ComponentFixture];
}
