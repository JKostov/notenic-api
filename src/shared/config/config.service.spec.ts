import { Test } from '@nestjs/testing';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';
import { ConfigService } from '@app/shared/config/config.service';

describe('ConfigService', () => {
  let configService: IConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ useValue: new ConfigService(`.env.${process.env.NODE_ENV}`), provide: ConfigService }],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', async () => {
    expect(configService).toBeDefined();
  });
});
