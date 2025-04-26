import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProviderName = 'Cloudinary';

export const Cloudinary = {
  provide: CloudinaryProviderName,
  useFactory: (_ConfigService: ConfigService) => {
    cloudinary.config({
      cloud_name: _ConfigService.get('CLOUD_NAME'),
      api_key: _ConfigService.get('CLOUD_API_KEY'),
      api_secret: _ConfigService.get('CLOUD_API_SECRET'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
