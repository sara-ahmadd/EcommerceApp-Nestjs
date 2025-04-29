import { Module } from '@nestjs/common';
import { FileModule } from './../../common/fileUpload/file.module';
import { BrandModel } from './../../DB/models/brand.model';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { BrandService } from './brand.service';

@Module({
  imports: [BrandModel, FileModule],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandRepository],
})
export class BrandModule {}
