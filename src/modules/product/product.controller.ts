import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateProdDto } from './dtos/update-prod.dto';
import { TransformToObjectIdPipe } from './../../common/pipes/toObjectId.pipe';
import { maxProductImagesLength } from './../../DB/models/product.model';
import { UserDocument } from './../../DB/models/user.model';
import { DeleteProdImageDto } from './dtos/delete-img.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

export interface IFiles {
  thumbnail: Express.Multer.File[];
  images: Express.Multer.File[];
}

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
    files: IFiles,
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

  @Roles(UserRoles.vendor)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: maxProductImagesLength },
    ]),
  )
  @Patch('/update_product/:id')
  updateProduct(
    @Body() body: UpdateProdDto,
    @Param('id', TransformToObjectIdPipe) productId: Types.ObjectId,
    @UploadedFiles() files: IFiles,
    @User() user: Partial<UserDocument>,
  ) {
    return this.productService.updateProduct(body, productId, files, user);
  }
  //specialized endpoint to delete images or thumbnail from a product by its id
  @Roles(UserRoles.vendor)
  @Patch('/delete_image/:productId')
  deleteProdImage(
    @Body() body: DeleteProdImageDto,
    @Param('productId', ParseObjectIdPipe) productId: Types.ObjectId,
    @User() user: Partial<UserDocument>,
  ) {
    return this.productService.deleteImageProd(body, productId, user);
  }
  //delete product by id
  @Roles(UserRoles.vendor)
  @Delete('/delete/:productId')
  deleteProduct(
    @Param('productId', ParseObjectIdPipe) productId: Types.ObjectId,
    @User() user: Partial<UserDocument>,
  ) {
    return this.productService.deleteProduct(productId, user);
  }
}
