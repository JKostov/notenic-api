import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokenModule } from './token/token.module';
import { SharedModule } from '@app/shared/shared.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

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
