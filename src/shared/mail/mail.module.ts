import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigModule } from '@app/shared/config/config.module';
import { MailFactory } from '@app/shared/mail/mail.factory';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailFactory,
    }),
  ],
  providers: [
    {
      provide: 'IMailService',
      useClass: MailService,
    },
  ],
  exports: ['IMailService'],
})
export class MailModule {}
