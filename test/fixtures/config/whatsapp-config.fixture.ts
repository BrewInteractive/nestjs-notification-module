import { Mock } from 'mockingbird';
import { WhatsappServiceType } from '../../../src/whatsapp/enum/whatsapp-service-type.enum';
import { MetaWhatsappConfigFixture } from '../whatsapp/meta-whatsapp-config.fixture';

export class WhatsappConfigFixture {
  @Mock(WhatsappServiceType.META)
  whatsappService: string;

  @Mock(MetaWhatsappConfigFixture)
  meta: MetaWhatsappConfigFixture;
}
