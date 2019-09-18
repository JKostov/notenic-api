import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { User } from '@notenic/user/user.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '@notenic/note/note.entity';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: getRepositoryToken(Note, DatabaseFactory.connectionName), useValue: {} },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
