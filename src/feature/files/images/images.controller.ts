import { Controller, Post, Res, UseInterceptors, UseGuards, UploadedFiles, HttpStatus, Get, Param, Delete } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { LoggedGuard } from '@app/shared/guards/logged.guard';

@Controller('images')
export class ImagesController {

  @Post('')
  @UseGuards(LoggedGuard)
  @UseInterceptors(FilesInterceptor('images[]', 10))
  public async upload(@UploadedFiles() images, @Res() res) {
    const imageUrls: string[] = [];

    images.forEach(i => imageUrls.push(i.filename));

    return res.status(HttpStatus.OK).json({ imageUrls });
  }

  @Get(':fileName')
  public async getImage(@Param() param, @Res() res) {
    const file = path.join('uploads/images', param.fileName);

    return res.status(HttpStatus.OK).download(file) ;
  }

  @Delete(':fileName')
  public deleteImage(@Param() param, @Res() res) {
    const file = path.join('uploads/images', param.fileName);
    let success = false;

    try {
      fs.unlinkSync(file);
      success = true;
    } catch (e) {
      success = false;
    }

    return res.status(HttpStatus.OK).json({ success }) ;
  }
}
