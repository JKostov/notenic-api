import { Module } from '@nestjs/common';
import { NotenicModule } from './notenic/notenic.module';

@Module({
  imports: [NotenicModule],
})
export class FeatureModule {}
