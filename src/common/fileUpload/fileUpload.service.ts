import { BadRequestException, Inject } from '@nestjs/common';
import {
  v2 as Cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { CloudinaryProviderName } from '../providers/cloudinary.provider';

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
  async deleteFolderWithItaAssets(folderPath: string) {
    await this.cloudinary.api.delete_resources_by_prefix(folderPath);
    const deletedFolder = await this.cloudinary.api.delete_folder(folderPath);
    return deletedFolder.deleted;
  }
}
