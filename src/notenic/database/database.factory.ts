import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  private static readonly MaxPortNumber = 65535;
  private static readonly MinPortNumber = 1;
  private static readonly DefaultPort = 5432;
  public static connectionName = 'notenic';

  constructor(@Inject('IConfigService') private configService: IConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: DatabaseFactory.connectionName,
      type: 'postgres',
      port: this.getDatabasePort(),
      host: this.configService.get('TYPEORM_HOST'),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      synchronize: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }

  private getDatabasePort(): number {
    const port = this.configService.get('TYPEORM_PORT');
    const numberPort = Number(port);

    if (isNaN(numberPort) || numberPort > DatabaseFactory.MaxPortNumber || numberPort < DatabaseFactory.MinPortNumber) {
      return DatabaseFactory.DefaultPort;
    }

    return numberPort;
  }
}
