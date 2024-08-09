import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { MockFactory } from 'mockingbird';
import { Test } from '@nestjs/testing';
import { classes } from '@automapper/classes';
import { WhatsappModule } from './whatsapp.module';
import { WhatsappConfigFixture } from '../../test/fixtures';

describe('WhatsappModule', () => {
  let whatsappModule: WhatsappModule;

  it('Should be defined (With META)', async () => {
    const whatsappConfig = () => MockFactory(WhatsappConfigFixture).one();
    const app = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({ strategyInitializer: classes() }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [whatsappConfig],
        }),
        WhatsappModule,
      ],
    }).compile();

    whatsappModule = app.get<WhatsappModule>(WhatsappModule);
    expect(whatsappModule).toBeDefined();
  });

  it('Should throw error', async () => {
    const whatsappServiceType = 'mock';
    const whatsappConfig = () =>
      MockFactory(WhatsappConfigFixture)
        .mutate({ whatsappService: whatsappServiceType })
        .one();
    const expectedError = new Error(
      whatsappServiceType + ' service is not defined for Whatsapp Service',
    );
    await expect(
      Test.createTestingModule({
        imports: [
          AutomapperModule.forRoot({ strategyInitializer: classes() }),
          ConfigModule.forRoot({
            isGlobal: true,
            load: [whatsappConfig],
          }),
          WhatsappModule,
        ],
      }).compile(),
    ).rejects.toThrow(expectedError);
  });
});
