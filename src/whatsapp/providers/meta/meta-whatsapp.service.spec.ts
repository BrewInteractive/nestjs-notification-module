import { Test, TestingModule } from "@nestjs/testing";
import { MetaWhatsappService } from "./";
import { MetaWhatsappConfigFixture } from "../../../../test/fixtures/whatsapp";
import { MockFactory } from "mockingbird";
import { WhatsappMessageFixture } from "../../../../test/fixtures/whatsapp/whatsapp-message.fixture";


describe("MetaWhatsappService", () => {
    let metaWhatsappService: MetaWhatsappService;
    const mockMetaWhatsappConfig = MockFactory(MetaWhatsappConfigFixture).one();

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MetaWhatsappService,
                {
                    provide: "MetaWhatsappConfig",
                    useValue: mockMetaWhatsappConfig,
                },
            ],
        }).compile();

        metaWhatsappService = module.get<MetaWhatsappService>(MetaWhatsappService);
    });

    it("should be defined", () => {
        expect(metaWhatsappService).toBeDefined();
    });

    it("should send SMS successfully", async () => {
        const whatsappMessage = MockFactory(WhatsappMessageFixture).one();

        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve("Success"),
            })
        ) as jest.Mock;

        await metaWhatsappService.sendMessageAsync(whatsappMessage);


        expect(global.fetch).toHaveBeenCalledWith(mockMetaWhatsappConfig.metaApiUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + mockMetaWhatsappConfig.token,
            },
            body: JSON.stringify(whatsappMessage),
        });
    });
});
