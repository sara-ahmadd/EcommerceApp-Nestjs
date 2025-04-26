import { BadRequestException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as Cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { CategoryRepository } from 'src/modules/category/category.repository';
import { CloudinaryProviderName } from '../providers/cloudinary.provider';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class FileServices {
  constructor(
    @Inject(CloudinaryProviderName) private cloudinary: typeof Cloudinary,
  ) {}
  async uploadFile(
    options: UploadApiOptions,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('file is missing!!');
    }
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) reject(error);
          resolve(result!);
        })
        .end(file.buffer);
    });
  }
}
