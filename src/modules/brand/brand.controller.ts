import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { Types } from 'mongoose';
import { User } from './../../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './../../common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Public } from './../../common/decorators/public.decorator';
import { GetAllBrandsDto } from './dtos/get-all-brands.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { CheckFilePipe } from './../../common/pipes/validateFile.pipe';

@Controller('brand')
export class BrandController {
  constructor(private readonly BrandService: BrandService) {}

  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('logo'))
  @Post('/create')
  createBrand(
    @UploadedFile(CheckFilePipe) file: Express.Multer.File,
    @Body() body: CreateBrandDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.BrandService.createBrand(file, body, userId);
  }

  @Public()
  @Get('/all')
  getAllCategories(@Query() query: GetAllBrandsDto) {
    return this.BrandService.getAllCategories(query);
  }

  //get Brand by slug
  @Public()
  @Get('/:slug')
  getBrandBySlug(@Param('slug') slug: string) {
    return this.BrandService.getBrandBySlug(slug);
  }

  //update Brand by slug
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('logo'))
  @Patch('/')
  updateBrandBySlug(
    @Query() query: UpdateBrandDto,
    @Body() body: UpdateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.BrandService.updateBrand(query, body, file);
  }
  //delete Brand by id
  @Roles(UserRoles.admin)
  @Delete('/:id')
  deleteBrandById(@Param('id') BrandId: Types.ObjectId) {
    return this.BrandService.deleteBrand(BrandId);
  }
}
