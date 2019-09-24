import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared/shared.module';
import { NotenicModule } from '@notenic/notenic.module';

@Module({
  imports: [
    SharedModule,
    NotenicModule,
  ],
})
export class AppModule {}
