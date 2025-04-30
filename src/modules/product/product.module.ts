import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryRepository } from '../category/category.repository';
import { SubCategoryRepository } from '../sub-category/SubCategory.repository';
import { BrandRepository } from '../brand/brand.repository';
import { FileModule } from './../../common/fileUpload/file.module';
import { ProductRepo } from './product.repository';
import { CategoryModel } from './../../DB/models/category.model';
import { SubCategoryModel } from './../../DB/models/subCategory.model';
import { ProductModel } from './../../DB/models/product.model';
import { BrandModel } from './../../DB/models/brand.model';

@Module({
  imports: [
    FileModule,
    CategoryModel,
    SubCategoryModel,
    ProductModel,
    BrandModel,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CategoryRepository,
    SubCategoryRepository,
    BrandRepository,
    ProductRepo,
  ],
})
export class ProductModule {}
