import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from './database.factory';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    useClass: DatabaseFactory,
    name: DatabaseFactory.connectionName,
  })],
})
export class DatabaseModule { }
