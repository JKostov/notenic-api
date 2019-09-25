import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@app/shared/config/config.module';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    {
      provide: 'SERVICES_CLIENT',
      useFactory: (configService: IConfigService) => {
        const url = configService.get('NATS_URL');
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            url,
          },
        });
      },
      inject: ['IConfigService'],
    },
  ],
  exports: ['SERVICES_CLIENT'],
})
export class MicroservicesClientModule {}
