import { Module } from '@nestjs/common';
import { FileServices } from './fileUpload.service';
import { Cloudinary } from '../providers/cloudinary.provider';

@Module({
  providers: [FileServices, Cloudinary],
  exports: [FileServices, Cloudinary],
})
export class FileModule {}
