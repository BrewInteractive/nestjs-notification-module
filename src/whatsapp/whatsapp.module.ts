import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MetaWhatsappService } from "./providers/meta";
import { WhatsappService } from "./whatsapp.service";
import { WhatsappServiceType } from "./enum/whatsapp-service-type.enum";

@Module({
    imports: [],
    providers: [
        {
            provide: 'MetaWhatsappConfig',
            useFactory: (configService: ConfigService) =>
                configService.get('meta'),
            inject: [ConfigService]
        },
        MetaWhatsappService,
        {
            provide: 'WhatsappService',
            useFactory: (
                metaWhatsappService: WhatsappService,
                configService: ConfigService
            ) => {
                const whatsappServiceType = configService.get('whatsappService')

                switch (whatsappServiceType) {
                    case WhatsappServiceType.META:
                      return metaWhatsappService;
                    default:
                      throw new Error(
                        whatsappServiceType + ' service is not defined for Whatsapp Service',
                      );
                  }
            },
            inject: [MetaWhatsappService, ConfigService],
        },
    ],
    exports: ['WhatsappService']
})
export class WhatsappModule{}