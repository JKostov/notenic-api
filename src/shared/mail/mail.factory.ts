import { Inject } from '@nestjs/common';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';
import { HandlebarsAdapter, MailerOptions, MailerOptionsFactory } from '@nest-modules/mailer';

export class MailFactory implements MailerOptionsFactory {

  constructor(@Inject('IConfigService') private configService: IConfigService) {
  }

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get('MAILER_HOST'),
        port: this.configService.get('MAILER_PORT'),
        secure: true,
        auth: {
          user: this.configService.get('MAILER_USERNAME'),
          pass: this.configService.get('MAILER_PASSWORD'),
        },
      },
      defaults: {
        from: this.configService.get('MAILER_FROM'),
      },
      template: {
        dir: __dirname + '/../../../templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
