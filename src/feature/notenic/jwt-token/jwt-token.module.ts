import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared/shared.module';
import { TokenFactory } from '@notenic/jwt-token/token.factory';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [SharedModule],
      useClass: TokenFactory,
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
