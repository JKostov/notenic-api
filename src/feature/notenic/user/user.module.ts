import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFactory } from '../database/database.factory';
import { User } from '@notenic/user/user.entity';
import { UserController } from './user.controller';
import { GuardsModule } from '@notenic/guards/guards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], DatabaseFactory.connectionName),
    GuardsModule,
  ],
  providers: [{
    provide: 'IUserService',
    useClass: UserService,
  }],
  exports: ['IUserService'],
  controllers: [UserController],
})
export class UserModule {}
