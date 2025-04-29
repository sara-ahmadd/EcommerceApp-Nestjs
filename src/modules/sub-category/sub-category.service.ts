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
import { SubCategoryDocument } from './../../DB/models/subCategory.model';
import { SubCategoryRepository } from './SubCategory.repository';
import { GetAllSubCategoriesDto } from './dtos/get-all-subCategories.dto';
import { UpdateSubCategoryDto } from './dtos/update-subCategory.dto';
import { CreateSubCategoryDto } from './dtos/create-subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    private _SubCategoryRepo: SubCategoryRepository,
    private _ConfigService: ConfigService,
    private _FileService: FileServices,
  ) {}

  //create SubCategory
  async createSubCategory(
    file: Express.Multer.File,
    body: CreateSubCategoryDto,
    userId: Types.ObjectId,
  ) {
    const checkCateg = await this._SubCategoryRepo.findOne({
      filter: { name: body.name },
    });
    if (checkCateg)
      throw new ConflictException(
        'A SubCategory with this name already exists',
      );

    //create empty image folder
    let image = {} as IImage;
    const imageFolderPath = `${this._ConfigService.get('CLOUD_APP_FOLDER')}/SubCategories/${body.name}`;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { folder: imageFolderPath },
        file,
      );
      image = { secure_url, public_id };
    }

    const SubCategory = await this._SubCategoryRepo.create({
      data: {
        name: body.name,
        categoryId: new Types.ObjectId(body.categoryId),
        createdBy: userId,
        image,
        folder: imageFolderPath,
      },
    });
    return { messag: 'SubCategory is created successfully', SubCategory };
  }
  //get all SubCategories for admins
  async getAllSubCategories(query: GetAllSubCategoriesDto) {
    const data = await this._SubCategoryRepo.findAll({
      filter: {},
      page: query.page ?? 1,
      populate: [
        { path: 'createdBy', select: 'name email' },
        { path: 'categoryId', select: 'name image' },
      ],
    });
    return { message: 'All SubCategories fetched successfully', ...data };
  }
  //get single SubCategory by slug
  async getSubCategoryBySlug(slug: string) {
    const SubCategory = await this._SubCategoryRepo.findOne({
      filter: { slug },
      populate: [
        { path: 'createdBy', select: 'name email' },
        { path: 'categoryId', select: 'name image' },
      ],
    });
    if (!SubCategory) throw new NotFoundException('SubCategory is not found');
    return {
      message: 'SubCategory data fetched successfully',
      SubCategory: {
        name: SubCategory.name,
        image: SubCategory.image,
        slug: SubCategory.slug,
        createdBy: SubCategory.createdBy,
        category: SubCategory.categoryId,
      },
    };
  }

  //update a SubCategory for admins by slug or id
  async updateSubCategory(
    query: UpdateSubCategoryDto,
    body: UpdateSubCategoryDto,
    file: Express.Multer.File,
  ) {
    let SubCategory: SubCategoryDocument | null = null;
    if (query.slug) {
      SubCategory = await this._SubCategoryRepo.findOne({
        filter: { slug: query.slug },
      });
    } else if (query.id) {
      SubCategory = await this._SubCategoryRepo.findOne({
        filter: { _id: query.id },
      });
    } else {
      throw new BadRequestException(
        'you must provide id or slug of the SubCategory',
      );
    }
    if (!SubCategory) throw new NotFoundException('SubCategory is not found');

    // //if file uploaded , update it on cloudinary
    let image = {} as IImage;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { public_id: SubCategory.image?.public_id },
        file,
      );
      image = { secure_url, public_id };
    }

    SubCategory.name = body.name ? body.name : SubCategory.name;

    SubCategory.image = file ? image : SubCategory.image;
    await SubCategory.save();

    const updatedSubCategory = await this._SubCategoryRepo.findOne({
      filter: { _id: SubCategory._id },
    });
    return { message: 'SubCategory updated successfully', updatedSubCategory };
  }

  //delete SubCategory byid for admins
  async deleteSubCategory(SubCategoryId: Types.ObjectId) {
    const SubCategory = await this._SubCategoryRepo.findOne({
      filter: { _id: SubCategoryId },
    });
    if (!SubCategory) throw new NotFoundException('SubCategory is not found');
    await SubCategory.deleteOne();
    return { message: 'SubCategory is deleted successfully.' };
  }
}
