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
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dtos/create-subCategory.dto';
import { Types } from 'mongoose';
import { User } from './../../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './../../common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Public } from './../../common/decorators/public.decorator';
import { GetAllSubCategoriesDto } from './dtos/get-all-subCategories.dto';
import { UpdateSubCategoryDto } from './dtos/update-subCategory.dto';
import { CheckFilePipe } from './../../common/pipes/validateFile.pipe';

@Controller('sub_category')
export class SubCategoryController {
  constructor(private readonly SubCategoryService: SubCategoryService) {}

  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/create')
  createSubCategory(
    @UploadedFile(CheckFilePipe) file: Express.Multer.File,
    @Body() body: CreateSubCategoryDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.SubCategoryService.createSubCategory(file, body, userId);
  }

  @Public()
  @Get('/all')
  getAllSubCategories(@Query() query: GetAllSubCategoriesDto) {
    return this.SubCategoryService.getAllSubCategories(query);
  }

  //get SubCategory by slug
  @Public()
  @Get('/:slug')
  getSubCategoryBySlug(@Param('slug') slug: string) {
    return this.SubCategoryService.getSubCategoryBySlug(slug);
  }

  //update SubCategory by slug or id
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('/')
  updateSubCategoryBySlug(
    @Query() query: UpdateSubCategoryDto,
    @Body() body: UpdateSubCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.SubCategoryService.updateSubCategory(query, body, file);
  }
  //delete SubCategory by id
  @Roles(UserRoles.admin)
  @Delete('/:id')
  deleteSubCategoryById(@Param('id') SubCategoryId: Types.ObjectId) {
    return this.SubCategoryService.deleteSubCategory(SubCategoryId);
  }
}
