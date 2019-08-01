import { Test, TestingModule } from '@nestjs/testing';
import { NotenicLoggerService } from './notenic-logger.service';
import { ConfigModule } from '@app/shared/config/config.module';

describe('NotenicLoggerService', () => {
  let service: NotenicLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        NotenicLoggerService,
      ],
    }).compile();

    service = module.get<NotenicLoggerService>(NotenicLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
