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

  /**
   *
   * @param options Options passed to upload function from cloudinary
   * @param file The file to be uploaded of type :Express.Multer.File
   * @returns The result from file upload to cloudinary: {secure_url, pucblic_id}
   */
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
  /**
   * delete image from cloudinary by its public_id
   */

  async deleteFile(public_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}
