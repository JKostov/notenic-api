import { Injectable } from '@nestjs/common';
import { IMailService } from '@app/shared/mail/interfaces/mail.service.interface';

@Injectable()
export class MailService implements IMailService {}
