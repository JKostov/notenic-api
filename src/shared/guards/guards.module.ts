import { Module } from '@nestjs/common';
import { LoggedGuard } from './logged.guard';
import { LoggedOrNotGuard } from './logged-or-not.guard';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';

@Module({
  imports: [
    JwtTokenModule,
  ],
  providers: [
    LoggedGuard,
    LoggedOrNotGuard,
  ],
  exports: [JwtTokenModule],
})
export class GuardsModule {}
