import { Module } from '@nestjs/common';
import { ConfigService } from '@app/shared/config/config.service';

@Module({
  providers: [
    {
      provide: 'IConfigService',
      useValue: new ConfigService(`.env.${process.env.NODE_ENV}`),
    },
  ],
  exports: ['IConfigService'],
})
export class ConfigModule {}
