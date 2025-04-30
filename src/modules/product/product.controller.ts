import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { User } from './../../common/decorators/user.decorator';
import { Types } from 'mongoose';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Roles } from './../../common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Public } from './../../common/decorators/public.decorator';
import { GetSingleProductDto } from './dtos/get-product.dto';
import { GetAllProductsDto } from '../category/dtos/get-all-prods.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserRoles.vendor)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 4 },
    ]),
  )
  @Post('/create')
  createProduct(
    @Body() body: CreateProductDto,
    @User('_id') userId: Types.ObjectId,
    @UploadedFiles()
    files: { thumbnail: Express.Multer.File[]; images: Express.Multer.File[] },
  ) {
    return this.productService.createProduct(body, userId, files);
  }

  @Public()
  @Get('/get_product/:id')
  getProduct(@Param() params: GetSingleProductDto) {
    return this.productService.getProduct(params);
  }
  @Public()
  @Get('/all')
  getAllProducts(@Query() query: GetAllProductsDto) {
    return this.productService.getAllProducts(query);
  }
}
