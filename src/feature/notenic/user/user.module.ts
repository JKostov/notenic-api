import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from '../database/database.factory';
import { User } from '@notenic/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], DatabaseFactory.connectionName),
  ],
  providers: [{
    provide: 'IUserService',
    useClass: UserService,
  }],
  exports: ['IUserService'],
})
export class UserModule {}
