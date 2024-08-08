import { Injectable } from '@nestjs/common';
import { WhatsappMessage } from './dto'

@Injectable()
export abstract class WhatsappService {
    abstract sendMessageAsync(whatsappMessage: WhatsappMessage): Promise<void>;
}
