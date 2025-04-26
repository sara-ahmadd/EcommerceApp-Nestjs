import {
  Body,
  Controller,
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
import { User } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from '../user/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { GetAllCategoriesDto } from './dtos/get-all-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/create')
  createCategory(
    @UploadedFile() file: Express.Multer.File,
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

  //get category by slug
  @Roles(UserRoles.admin)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('/')
  updateCategoryBySlug(
    @Query() query: UpdateCategoryDto,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.updateCategory(query, body, file);
  }
}
