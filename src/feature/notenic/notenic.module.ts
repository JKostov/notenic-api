import { Module } from '@nestjs/common';
import { AuthModule } from '@app/feature/notenic/auth/auth.module';
import { DatabaseModule } from '@notenic/database/database.module';
import { UserModule } from '@notenic/user/user.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
})
export class NotenicModule {}
