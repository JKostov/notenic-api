import { Note } from '@notenic/note/note.entity';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { User } from '@notenic/user/user.entity';

export interface INoteService {
  getNotes(limit?: number, page?: number): Promise<Note[]>;
  createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note>;
}
