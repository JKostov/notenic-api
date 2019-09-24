import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { GuardsModule } from '@notenic/guards/guards.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

@Module({
  imports: [
    GuardsModule,
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/images'),
        filename: (req, file, cb) => cb(null, randomBytes(16).toString('hex') + '-' + file.originalname),
      }),
    }),

],
  controllers: [ImagesController],
})
export class ImagesModule {}
