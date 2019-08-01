import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetService } from './password-reset.service';
import { PasswordReset } from '@notenic/auth/password-reset.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseFactory } from '@notenic/database/database.factory';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordResetService, { provide: getRepositoryToken(PasswordReset, DatabaseFactory.connectionName), useValue: {} }],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
