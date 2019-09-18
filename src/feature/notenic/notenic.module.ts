import { Module } from '@nestjs/common';
import { AuthModule } from '@app/feature/notenic/auth/auth.module';
import { DatabaseModule } from '@notenic/database/database.module';
import { UserModule } from '@notenic/user/user.module';
import { NoteModule } from './note/note.module';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    NoteModule,
    GuardsModule,
  ],
})
export class NotenicModule {}
