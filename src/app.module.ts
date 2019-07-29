import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { SharedModule } from '@app/shared/shared.module';
import { FeatureModule } from '@app/feature/feature.module';

@Module({
  imports: [
    SharedModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
