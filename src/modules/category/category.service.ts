import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { FileServices } from './../../common/fileUpload/fileUpload.service';
import { IImage } from './../../common/types/image.type';
import { CategoryDocument } from './../../DB/models/category.model';
import { CategoryRepository } from './category.repository';
import { GetAllCategoriesDto } from './dtos/get-all-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private _CategoryRepo: CategoryRepository,
    private _ConfigService: ConfigService,
    private _FileService: FileServices,
  ) {}

  //create category
  async createCategory(
    file: Express.Multer.File,
    body: Partial<CategoryDocument>,
    userId: Types.ObjectId,
  ) {
    const checkCateg = await this._CategoryRepo.findOne({
      filter: { name: body.name },
    });
    if (checkCateg)
      throw new ConflictException('A category with this name already exists');

    //create empty image folder
    let image = {} as IImage;
    const imageFolderPath = `${this._ConfigService.get('CLOUD_APP_FOLDER')}/categories/${body.name}`;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { folder: imageFolderPath },
        file,
      );
      image = { secure_url, public_id };
    }

    const category = await this._CategoryRepo.create({
      data: { ...body, createdBy: userId, image, folder: imageFolderPath },
    });
    return { messag: 'category is created successfully', category };
  }
  //get all categories for admins
  async getAllCategories(query: GetAllCategoriesDto) {
    const data = await this._CategoryRepo.findAll({
      filter: {},
      page: query.page ?? 1,
    });
    return { message: 'All categories fetched successfully', ...data };
  }
  //get single category by slug
  async getCategoryBySlug(slug: string) {
    const category = await this._CategoryRepo.findOne({
      filter: { slug },
      populate: { path: 'createdBy', select: 'name email' },
    });
    if (!category) throw new NotFoundException('Category is not found');
    return {
      message: 'Category data fetched successfully',
      category: {
        name: category.name,
        image: category.image,
        slug: category.slug,
        createdBy: category.createdBy,
      },
    };
  }

  //update a category for admins
  async updateCategory(
    query: UpdateCategoryDto,
    body: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    let category: CategoryDocument | null = null;
    if (query.slug) {
      category = await this._CategoryRepo.findOne({
        filter: { slug: query.slug },
      });
    } else if (query.id) {
      category = await this._CategoryRepo.findOne({
        filter: { _id: query.id },
      });
    } else {
      throw new BadRequestException(
        'you must provide id or slug of the category',
      );
    }
    if (!category) throw new NotFoundException('Category is not found');

    // //if file uploaded , update it on cloudinary
    let image = {} as IImage;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { public_id: category.image?.public_id },
        file,
      );
      image = { secure_url, public_id };
    }

    category.name = body.name ? body.name : category.name;

    category.image = file ? image : category.image;
    await category.save();

    const updatedCategory = await this._CategoryRepo.findOne({
      filter: { _id: category._id },
    });
    return { message: 'Category updated successfully', updatedCategory };
  }

  //delete category byid for admins
  async deleteCategory(categoryId: Types.ObjectId) {
    const category = await this._CategoryRepo.findOne({
      filter: { _id: categoryId },
    });
    if (!category) throw new NotFoundException('Category is not found');
    await category.deleteOne();
    return { message: 'Category is deleted successfully.' };
  }
}
