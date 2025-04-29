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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Types } from 'mongoose';
import { User } from './../../common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './../../common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Public } from './../../common/decorators/public.decorator';
import { GetAllCategoriesDto } from './dtos/get-all-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CheckFilePipe } from './../../common/pipes/validateFile.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/create')
  createCategory(
    @UploadedFile(CheckFilePipe) file: Express.Multer.File,
    @Body() body: CreateCategoryDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.categoryService.createCategory(file, body, userId);
  }

  @Public()
  @Get('/all')
  getAllCategories(@Query() query: GetAllCategoriesDto) {
    return this.categoryService.getAllCategories(query);
  }

  //get category by slug
  @Public()
  @Get('/:slug')
  getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug);
  }

  //update category by slug
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('/')
  updateCategoryBySlug(
    @Query() query: UpdateCategoryDto,
    @Body() body: UpdateCategoryDto,
    @UploadedFile(CheckFilePipe) file: Express.Multer.File,
  ) {
    return this.categoryService.updateCategory(query, body, file);
  }
  //delete category by id
  @Roles(UserRoles.admin)
  @Delete('/:id')
  deleteCategoryById(@Param('id') categoryId: Types.ObjectId) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
