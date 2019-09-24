import { Module } from '@nestjs/common';
import { NotenicModule } from '@notenic/notenic.module';
import { FilesModule } from '@files/files.module';

@Module({
  imports: [NotenicModule, FilesModule],
})
export class FeatureModule {}
