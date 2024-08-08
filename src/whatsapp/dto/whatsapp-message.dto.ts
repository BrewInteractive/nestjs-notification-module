export class WhatsappMessage{
    messagingProduct: string;
    to: string;
    type: string;
    template: {
        name: string,
        language: {
            code: string
        },
        components: [
            {
                type: string,
                text: string
            }
        ]
    }
}