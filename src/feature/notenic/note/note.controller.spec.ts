import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { LoggedGuard } from '@notenic/../../../shared/guards/logged.guard';

describe('Note Controller', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        { provide: 'INoteService', useValue: {} },
        { provide: 'ITokenService', useValue: {} },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
