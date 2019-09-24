import { Note } from '@notenic/note/note.entity';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { User } from '@notenic/user/user.entity';
import { LikeNoteDto } from '@notenic/note/dto/like-note.dto';

export interface INoteService {
  getPublicNote(username: string, title: string): Promise<Note>;
  getPublicNoteById(id: string): Promise<Note>;
  getNotes(limit?: number, page?: number): Promise<Note[]>;
  createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note>;
  likeNote(likeNoteDto: LikeNoteDto, user: User): Promise<boolean>;
}
