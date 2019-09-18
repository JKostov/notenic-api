import { Injectable } from '@nestjs/common';
import { INoteService } from '@notenic/note/note.service.interface';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { Note } from '@notenic/note/note.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '@notenic/user/user.entity';

@Injectable()
export class NoteService implements INoteService {
  constructor(@InjectRepository(Note, DatabaseFactory.connectionName) private readonly noteRepository: Repository<Note>) {
  }

  async getNotes(limit: number = 10, page: number = 0): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('n')
      .select(['n', 'u.id', 'u.username', 'u.firstName', 'u.lastName'])
      .innerJoin('n.user', 'u')
      .where('n.public = true')
      .take(limit)
      .skip(page)
      .getMany()
    ;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const note = plainToClass(Note, createNoteDto);
    note.user = user;
    return await this.noteRepository.save(note);
  }
}
