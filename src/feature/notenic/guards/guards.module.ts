import { Module } from '@nestjs/common';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { AuthModule } from '@notenic/auth/auth.module';
import { LoggedOrNotGuard } from '@notenic/guards/logged-or-not.guard';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    LoggedGuard,
    LoggedOrNotGuard,
  ],
  exports: [AuthModule],
})
export class GuardsModule {}
