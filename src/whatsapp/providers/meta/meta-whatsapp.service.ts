import { Inject, Injectable } from "@nestjs/common";
import { WhatsappMessage } from "../../dto";
import { WhatsappService } from "../../whatsapp.service";
import { MetaWhatsappConfig } from "./";

@Injectable()
export class MetaWhatsappService extends WhatsappService{

    constructor(
        @Inject("MetaWhatsappConfig")
        private readonly metaWhatsappConfig: MetaWhatsappConfig
    ) {
        super();
    }
    
    async sendMessageAsync(whatsappMessage: WhatsappMessage): Promise<void> {
        await this.sendMessage(whatsappMessage);
    }

    private async sendMessage(template: WhatsappMessage): Promise<void> {
        await fetch(this.metaWhatsappConfig.metaApiUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.metaWhatsappConfig.token,
            },
            body: JSON.stringify(template),
        }).then((response) => response.text());
    }
}