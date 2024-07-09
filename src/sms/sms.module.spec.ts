import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule } from '@nestjs/config';
import { SmsConfigFixture } from '../../test/fixtures';
import { MockFactory } from 'mockingbird';
import { Test } from '@nestjs/testing';
import { classes } from '@automapper/classes';
import { SmsModule } from './sms.module';

describe('SmsModule', () => {
  let smsModule: SmsModule;

  it('Should be defined (With MUTLUCELL)', async () => {
    const smsConfig = () => MockFactory(SmsConfigFixture).one();
    const app = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({ strategyInitializer: classes() }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [smsConfig],
        }),
        SmsModule,
      ],
    }).compile();

    smsModule = app.get<SmsModule>(SmsModule);
    expect(smsModule).toBeDefined();
  });

  it('Should throw error', async () => {
    const smsServiceType = 'mock';
    const emailConfig = () =>
      MockFactory(SmsConfigFixture)
        .mutate({ smsService: smsServiceType })
        .one();
    const expectedError = new Error(
      smsServiceType + ' service is not defined for Sms Service',
    );
    await expect(
      Test.createTestingModule({
        imports: [
          AutomapperModule.forRoot({ strategyInitializer: classes() }),
          ConfigModule.forRoot({
            isGlobal: true,
            load: [emailConfig],
          }),
          SmsModule,
        ],
      }).compile(),
    ).rejects.toThrow(expectedError);
  });
});
