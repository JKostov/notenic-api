import { LoggedGuard } from './logged.guard';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoggedGuard', () => {
  let guard: LoggedGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'ITokenService', useValue: {} },
        LoggedGuard,
      ],
    }).compile();

    guard = module.get<LoggedGuard>(LoggedGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
