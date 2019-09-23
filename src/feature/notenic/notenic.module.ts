import { Module } from '@nestjs/common';
import { AuthModule } from '@app/feature/notenic/auth/auth.module';
import { DatabaseModule } from '@notenic/database/database.module';
import { UserModule } from '@notenic/user/user.module';
import { NoteModule } from './note/note.module';
import { GuardsModule } from './guards/guards.module';
import { CommentModule } from './comment/comment.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    NoteModule,
    GuardsModule,
    CommentModule,
    JwtTokenModule,
  ],
})
export class NotenicModule {}
