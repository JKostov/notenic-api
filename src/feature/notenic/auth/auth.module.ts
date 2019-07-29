import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/feature/notenic/database/database.module';
import { UserModule } from 'src/feature/notenic/user/user.module';
import { AuthController } from './auth.controller';
import { TokenModule } from './token/token.module';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    DatabaseModule,
    UserModule,
    TokenModule,
  ],
  controllers: [AuthController],
  exports: [TokenModule],
})
export class AuthModule {}
