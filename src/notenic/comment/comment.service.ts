import { Injectable } from '@nestjs/common';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@notenic/comment/comment.entity';
import { ICommentService } from '@notenic/comment/comment.service.interface';
import { User } from '@notenic/user/user.entity';
import { Note } from '@notenic/note/note.entity';

@Injectable()
export class CommentService implements  ICommentService {
  constructor(@InjectRepository(Comment, DatabaseFactory.connectionName) private commentRepository: Repository<Comment>) { }

  async createComment(comment: string, note: Note, user: User): Promise<Comment> {
    const c = new Comment();
    c.user = user;
    c.note = note;
    c.markdown = comment;

    return await this.commentRepository.save(c);
  }
}
