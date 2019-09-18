import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config/config.module';
import { MailModule } from './mail/mail.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    LoggerModule,

  ],
  exports: [ConfigModule, MailModule, LoggerModule],
})
export class SharedModule {}
