import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';
import { LoggerService as NestLogger, LoggerTransport } from 'nest-logger';

@Injectable()
export class NotenicLoggerService implements LoggerService {
  private readonly loggerService: NestLogger;

  constructor(@Inject('IConfigService') private readonly configService: IConfigService) {
    this.loggerService = new NestLogger(this.configService.get('LOGGER_LOG_LEVEL'), this.configService.get('LOGGER_LOG_SERVICE_NAME'),
      this.getTransports(), this.getFilePath());
  }

  debug(message: any, context?: string): any {
    this.loggerService.debug(message, context);
  }

  error(message: any, trace?: string, context?: string): any {
    this.loggerService.error(message, context);
  }

  log(message: any, context?: string): any {
    this.loggerService.log(message, context);
  }

  verbose(message: any, context?: string): any {
    this.loggerService.warn(message, context);
  }

  warn(message: any, context?: string): any {
    this.loggerService.warn(message, context);
  }

  private getTransports(): LoggerTransport[] {
    const t = this.configService.get('LOGGER_LOG_TRANSPORT');

    const transports: LoggerTransport[] = [];

    if (t.indexOf(LoggerTransport.CONSOLE) !== -1) {
      transports.push(LoggerTransport.CONSOLE);
    }

    if (t.indexOf(LoggerTransport.ROTATE) !== -1) {
      transports.push(LoggerTransport.ROTATE);
    }

    return transports;
  }

  private getFilePath(): string {
    const rootDir = __dirname + '/../../../';
    return rootDir + this.configService.get('LOGGER_LOG_PATH');
  }
}
