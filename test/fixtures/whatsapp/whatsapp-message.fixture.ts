import { Mock } from 'mockingbird';
import { 
  WhatsappMessage, 
  WhatsappTemplate, 
  WhatsappTextObject, 
  WhatsappMediaObject, 
  WhatsappLocationObject, 
  WhatsappContactObject, 
  WhatsappContactName, 
  WhatsappContactPhone, 
  WhatsappInteractiveObject,
  WhatsappReactionObject,
  WhatsappContext,
  WhatsappHeaderComponent,
  WhatsappBodyComponent,
  WhatsappButtonComponent
} from '../../../src/whatsapp/dto';

export class WhatsappMessageFixture extends WhatsappMessage {
  @Mock(() => 'whatsapp')
  messaging_product: string;
  
  @Mock(() => 'individual')
  recipient_type: 'individual' | 'group';
  
  @Mock((faker) => faker.phone.phoneNumber('+90##########'))
  to: string;
  
  @Mock(() => 'text')
  type: 'text' | 'template' | 'image' | 'audio' | 'video' | 'document' | 'location' | 'contacts' | 'interactive' | 'reaction' | 'sticker';
  
  @Mock(() => 'sent')
  status: 'sent' | 'delivered' | 'read' | 'failed';
  
  // Backward compatibility
  @Mock(() => 'whatsapp')
  messagingProduct: string;
}

export class WhatsappTextObjectFixture implements WhatsappTextObject {
  @Mock((faker) => faker.lorem.sentences(2))
  body: string;
  
  @Mock(() => false)
  preview_url: boolean;
}

export class WhatsappMediaObjectFixture implements WhatsappMediaObject {
  @Mock((faker) => faker.random.uuid())
  id: string;
  
  @Mock((faker) => faker.internet.url())
  link: string;
  
  @Mock((faker) => faker.lorem.sentence())
  caption: string;
  
  @Mock((faker) => faker.system.fileName())
  filename: string;
}

export class WhatsappLocationObjectFixture implements WhatsappLocationObject {
  @Mock((faker) => parseFloat(faker.address.longitude()))
  longitude: number;
  
  @Mock((faker) => parseFloat(faker.address.latitude()))
  latitude: number;
  
  @Mock((faker) => faker.address.city())
  name: string;
  
  @Mock((faker) => faker.address.streetAddress())
  address: string;
}

export class WhatsappContactNameFixture implements WhatsappContactName {
  @Mock((faker) => faker.name.findName())
  formatted_name: string;
  
  @Mock((faker) => faker.name.firstName())
  first_name: string;
  
  @Mock((faker) => faker.name.lastName())
  last_name: string;
  
  @Mock((faker) => faker.name.firstName())
  middle_name: string;
}

export class WhatsappContactPhoneFixture implements WhatsappContactPhone {
  @Mock((faker) => faker.phone.phoneNumber('+90##########'))
  phone: string;
  
  @Mock((faker) => faker.phone.phoneNumber('90##########'))
  wa_id: string;
  
  @Mock(() => 'MOBILE')
  type: string;
}

export class WhatsappContactObjectFixture implements WhatsappContactObject {
  @Mock(WhatsappContactNameFixture)
  name: WhatsappContactNameFixture;
  
  @Mock([WhatsappContactPhoneFixture])
  phones: WhatsappContactPhoneFixture[];
}

export class WhatsappTemplateLanguageFixture {
  @Mock(() => 'tr')
  code: string;
  
  @Mock(() => 'deterministic')
  policy: 'deterministic';
}

export class WhatsappHeaderComponentFixture implements WhatsappHeaderComponent {
  @Mock(() => 'header')
  type: 'header';
  
  @Mock(() => [{
    type: 'text',
    text: 'Header Text'
  }])
  parameters: {
    type: 'text' | 'image' | 'document' | 'video' | 'location';
    text?: string;
    image?: WhatsappMediaObject;
    document?: WhatsappMediaObject;
    video?: WhatsappMediaObject;
    location?: WhatsappLocationObject;
  }[];
}

export class WhatsappBodyComponentFixture implements WhatsappBodyComponent {
  @Mock(() => 'body')
  type: 'body';
  
  @Mock(() => [{
    type: 'text',
    text: 'Body parameter text'
  }])
  parameters: {
    type: 'text' | 'currency' | 'date_time';
    text?: string;
  }[];
}

export class WhatsappButtonComponentFixture implements WhatsappButtonComponent {
  @Mock(() => 'button')
  type: 'button';
  
  @Mock(() => 'quick_reply')
  sub_type: 'quick_reply' | 'url';
  
  @Mock(() => 0)
  index: number;
  
  @Mock(() => [{
    type: 'payload',
    payload: 'button_payload'
  }])
  parameters: {
    type: 'text' | 'payload';
    text?: string;
    payload?: string;
  }[];
}

export class WhatsappTemplateFixture implements WhatsappTemplate {
  @Mock((faker) => faker.lorem.word())
  name: string;
  
  @Mock(WhatsappTemplateLanguageFixture)
  language: WhatsappTemplateLanguageFixture;
  
  @Mock([WhatsappHeaderComponentFixture, WhatsappBodyComponentFixture, WhatsappButtonComponentFixture])
  components: (WhatsappHeaderComponentFixture | WhatsappBodyComponentFixture | WhatsappButtonComponentFixture)[];
}

export class WhatsappInteractiveObjectFixture implements WhatsappInteractiveObject {
  @Mock(() => 'button')
  type: 'button' | 'list';
  
  @Mock(() => ({
    type: 'text',
    text: 'Header text'
  }))
  header: {
    type: 'text' | 'image' | 'document' | 'video';
    text?: string;
  };
  
  @Mock(() => ({
    text: 'Interactive message body'
  }))
  body: {
    text: string;
  };
  
  @Mock(() => ({
    text: 'Footer text'
  }))
  footer: {
    text: string;
  };
  
  @Mock(() => ({
    buttons: [{
      type: 'reply',
      reply: {
        id: 'button_1',
        title: 'Button 1'
      }
    }]
  }))
  action: {
    buttons?: {
      type: 'reply';
      reply: {
        id: string;
        title: string;
      };
    }[];
  };
}

export class WhatsappReactionObjectFixture implements WhatsappReactionObject {
  @Mock((faker) => faker.random.uuid())
  message_id: string;
  
  @Mock(() => '👍')
  emoji: string;
}

export class WhatsappContextFixture implements WhatsappContext {
  @Mock((faker) => faker.random.uuid())
  message_id: string;
}

// Different message type fixtures
export class WhatsappTextMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'text')
  type: 'text';
  
  @Mock(WhatsappTextObjectFixture)
  text: WhatsappTextObjectFixture;
}

export class WhatsappTemplateMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'template')
  type: 'template';
  
  @Mock(WhatsappTemplateFixture)
  template: WhatsappTemplateFixture;
}

export class WhatsappImageMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'image')
  type: 'image';
  
  @Mock(WhatsappMediaObjectFixture)
  image: WhatsappMediaObjectFixture;
}

export class WhatsappLocationMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'location')
  type: 'location';
  
  @Mock(WhatsappLocationObjectFixture)
  location: WhatsappLocationObjectFixture;
}

export class WhatsappContactMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'contacts')
  type: 'contacts';
  
  @Mock([WhatsappContactObjectFixture])
  contacts: WhatsappContactObjectFixture[];
}

export class WhatsappInteractiveMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'interactive')
  type: 'interactive';
  
  @Mock(WhatsappInteractiveObjectFixture)
  interactive: WhatsappInteractiveObjectFixture;
}

export class WhatsappReactionMessageFixture extends WhatsappMessageFixture {
  @Mock(() => 'reaction')
  type: 'reaction';
  
  @Mock(WhatsappReactionObjectFixture)
  reaction: WhatsappReactionObjectFixture;
  
  @Mock(WhatsappContextFixture)
  context: WhatsappContextFixture;
}
