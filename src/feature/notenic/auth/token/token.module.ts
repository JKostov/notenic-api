import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './token.service';
import { UserModule } from '../../user/user.module';
import { SharedModule } from '@app/shared/shared.module';
import { PasswordResetService } from '@notenic/auth/password-reset.service';
import { PasswordReset } from '@notenic/auth/password-reset.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenModule } from '@app/shared/jwt-token/jwt-token.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([PasswordReset], DatabaseFactory.connectionName),
    JwtTokenModule,
    UserModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    {
      provide: 'IPasswordResetService',
      useClass: PasswordResetService,
    },
  ],
  exports: [PassportModule, 'ITokenService', 'IPasswordResetService'],
})
export class TokenModule {}
