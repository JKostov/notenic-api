import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INoteService } from '@notenic/note/note.service.interface';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { Note } from '@notenic/note/note.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '@notenic/user/user.entity';
import { IUserService } from '@notenic/user/user.service.interface';
import { LikeNoteDto } from '@notenic/note/dto/like-note.dto';
import { BookmarkNoteDto } from '@notenic/note/dto/bookmark-note.dto';

@Injectable()
export class NoteService implements INoteService {
  constructor(@InjectRepository(Note, DatabaseFactory.connectionName) private noteRepository: Repository<Note>,
              @Inject('IUserService')private userService: IUserService) {
  }

  async getNotes(limit: number = 10, page: number = 0): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('n')
      .select(['n', 'comment.id', 'u.id', 'u.username', 'u.firstName', 'u.lastName', 'u.gender', 'u.image'])
      .innerJoin('n.user', 'u')
      .leftJoin('n.comments', 'comment')
      .where('n.public = true')
      .take(limit)
      .skip(page)
      .getMany()
    ;
  }

  async getPublicNote(username: string, title: string): Promise<Note> {
    const user = await this.userService.getOneByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return await this.noteRepository.createQueryBuilder('n')
      .select(['n', 'u.id', 'user.id', 'user.username', 'user.image', 'user.gender',
        'user.id', 'user.username', 'u.username', 'u.firstName', 'u.lastName', 'u.gender', 'u.image'])
      .innerJoin('n.user', 'u')
      .leftJoinAndSelect('n.comments', 'comment')
      .leftJoin('comment.user', 'user')
      .where('n.public = true')
      .andWhere('n.user = :user')
      .andWhere('n.title = :title')
      .setParameters({ user: user.id, title })
      .getOne()
    ;
  }

  async getPublicNoteById(id: string): Promise<Note> {
    const note = await this.noteRepository.createQueryBuilder('n')
      .where('n.public = true')
      .andWhere('n.id = :id')
      .setParameter('id', id)
      .getOne()
    ;

    if (!note) {
      throw new BadRequestException('Note not found.');
    }

    return note;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const note = plainToClass(Note, createNoteDto);
    note.user = user;
    return await this.noteRepository.save(note);
  }

  async likeNote(likeNoteDto: LikeNoteDto, user: User): Promise<boolean> {
    const note = await this.getPublicNoteById(likeNoteDto.noteId);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    if (!note.likes) {
      note.likes = [];
    }

    if (likeNoteDto.like) {
      note.likes.push(user.id);
      await this.noteRepository.save(note);
      return true;
    }

    const index = note.likes.indexOf(user.id);
    if (index === -1) {
      return false;
    }

    note.likes.splice(index, 1);
    await this.noteRepository.save(note);
    return true;
  }

  async bookmarkNote(bookmarkNoteDto: BookmarkNoteDto, user: User): Promise<Note> {
    const note = await this.getPublicNoteById(bookmarkNoteDto.noteId);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    await this.userService.bookmarkNote(user, note);

    const res = new Note();
    res.id = note.id;
    return res;
  }

  async getBookmarkedNotes(user: User): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('n')
      .select(['n', 'comment.id'])
      .innerJoin('n.usersBookmarkedNote', 'u', 'u.id = :id', { id: user.id })
      .leftJoin('n.comments', 'comment')
      .getMany()
    ;
  }
}
