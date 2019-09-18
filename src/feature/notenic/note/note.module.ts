import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Note } from '@notenic/note/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { GuardsModule } from '@notenic/guards/guards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note], DatabaseFactory.connectionName),
    GuardsModule,
  ],
  providers: [
    { provide: 'INoteService', useClass: NoteService},
  ],
  controllers: [NoteController],
})
export class NoteModule {}