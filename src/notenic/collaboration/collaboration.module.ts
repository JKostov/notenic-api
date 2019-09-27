import { Module } from '@nestjs/common';
import { CollaborationService } from './collaboration.service';
import { CollaborationController } from './collaboration.controller';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { SharedModule } from '@app/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaboration } from '@notenic/collaboration/collaboration.entity';
import { UserModule } from '@notenic/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaboration], DatabaseFactory.connectionName),
    SharedModule,
    UserModule,
  ],
  providers: [{
    provide: 'ICollaborationService',
    useClass: CollaborationService,
  }],
  exports: ['ICollaborationService'],
  controllers: [CollaborationController],
})
export class CollaborationModule {}
