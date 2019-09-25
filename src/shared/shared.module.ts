import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config/config.module';
import { MailModule } from '@app/shared/mail/mail.module';
import { LoggerModule } from '@app/shared/logger/logger.module';
import { JwtTokenModule } from '@app/shared/jwt-token/jwt-token.module';
import { GuardsModule } from '@app/shared/guards/guards.module';
import { MicroservicesClientModule } from './microservices-client/microservices-client.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    LoggerModule,
    JwtTokenModule,
    GuardsModule,
    MicroservicesClientModule,
  ],
  exports: [
    ConfigModule,
    MailModule,
    LoggerModule,
    JwtTokenModule,
    GuardsModule,
    MicroservicesClientModule,
  ],
})
export class SharedModule {}
