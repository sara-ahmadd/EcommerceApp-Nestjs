import { Module } from '@nestjs/common';
import { FileModule } from 'src/common/fileUpload/file.module';
import { CategoryModel } from './../../DB/models/category.model';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [CategoryModel, FileModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}
