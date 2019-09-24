import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Note } from '@notenic/note/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { UserModule } from '@notenic/user/user.module';
import { CommentModule } from '@notenic/comment/comment.module';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note], DatabaseFactory.connectionName),
    SharedModule,
    UserModule,
    CommentModule,
  ],
  providers: [
    { provide: 'INoteService', useClass: NoteService},
  ],
  controllers: [NoteController],
})
export class NoteModule {}
