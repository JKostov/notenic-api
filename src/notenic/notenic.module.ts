import { Module } from '@nestjs/common';
import { AuthModule } from '@notenic/auth/auth.module';
import { DatabaseModule } from '@notenic/database/database.module';
import { UserModule } from '@notenic/user/user.module';
import { NoteModule } from './note/note.module';
import { CommentModule } from './comment/comment.module';
import { CollaborationModule } from './collaboration/collaboration.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    NoteModule,
    CommentModule,
    CollaborationModule,
  ],
})
export class NotenicModule {}
