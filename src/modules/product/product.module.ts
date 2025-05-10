import { Module } from '@nestjs/common';
import { BrandRepository } from '../brand/brand.repository';
import { CategoryRepository } from '../category/category.repository';
import { SubCategoryRepository } from '../sub-category/SubCategory.repository';
import { FileModule } from './../../common/fileUpload/file.module';
import { BrandModel } from './../../DB/models/brand.model';
import { CategoryModel } from './../../DB/models/category.model';
import { ProductModel } from './../../DB/models/product.model';
import { SubCategoryModel } from './../../DB/models/subCategory.model';
import { ProductController } from './product.controller';
import { ProductRepo } from './product.repository';
import { ProductService } from './product.service';
import { SocketModule } from '../socket/socket.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { SubCategoryModule } from '../sub-category/sub-category.module';

@Module({
  imports: [
    FileModule,
    BrandModule,
    CategoryModule,
    SubCategoryModule,
    ProductModel,

    SocketModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo],
  exports: [ProductService],
})
export class ProductModule {}
