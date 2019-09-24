import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '@notenic/user/user.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User, DatabaseFactory.connectionName), useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
