import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryModel } from './../../DB/models/category.model';
import { Cloudinary } from 'src/common/providers/cloudinary.provider';
import { FileModule } from 'src/common/fileUpload/file.module';

@Module({
  imports: [CategoryModel, FileModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, Cloudinary],
  exports: [CategoryRepository],
})
export class CategoryModule {}
