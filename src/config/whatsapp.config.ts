export const whatsappConfig = () => ({
  whatsappService: process.env.WHATSAPP_SERVICE,
  meta: {
    metaApiUrl: process.env.META_API_URL,
    token: process.env.META_AUTH_TOKEN,
  },
});
