import { Module } from '@nestjs/common';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { LoggedOrNotGuard } from '@notenic/guards/logged-or-not.guard';
import { JwtTokenModule } from '@notenic/jwt-token/jwt-token.module';

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
