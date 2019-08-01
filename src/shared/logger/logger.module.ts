import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config/config.module';
import { NotenicLoggerService } from './notenic-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [
    NotenicLoggerService,
  ],
  exports: [NotenicLoggerService],
})
export class LoggerModule {}
