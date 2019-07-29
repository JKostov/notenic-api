import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config/config.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
  ],
  exports: [ConfigModule, MailModule],
})
export class SharedModule {}
