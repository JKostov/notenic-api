import { Module } from '@nestjs/common';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@notenic/comment/comment.entity';
import { CommentService } from '@notenic/comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment], DatabaseFactory.connectionName),
  ],
  providers: [
    { provide: 'ICommentService', useClass: CommentService},
  ],
  exports: ['ICommentService'],
})
export class CommentModule {}
