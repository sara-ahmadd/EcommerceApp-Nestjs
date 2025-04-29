import { Module } from '@nestjs/common';
import { FileModule } from './../../common/fileUpload/file.module';
import { SubCategoryModel } from './../../DB/models/subCategory.model';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryRepository } from './SubCategory.repository';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [SubCategoryModel, FileModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepository],
  exports: [SubCategoryRepository],
})
export class SubCategoryModule {}
