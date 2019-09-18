import { Module } from '@nestjs/common';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { AuthModule } from '@notenic/auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [
    LoggedGuard,
  ],
  exports: [AuthModule],
})
export class GuardsModule {}
