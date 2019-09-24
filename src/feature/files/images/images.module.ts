import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    SharedModule,
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
