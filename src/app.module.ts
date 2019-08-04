import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared/shared.module';
import { FeatureModule } from '@app/feature/feature.module';

@Module({
  imports: [
    SharedModule,
    FeatureModule,
  ],
})
export class AppModule {}
