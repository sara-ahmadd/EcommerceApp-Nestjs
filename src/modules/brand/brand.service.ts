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
import { BrandDocument } from './../../DB/models/brand.model';
import { BrandRepository } from './brand.repository';
import { GetAllBrandsDto } from './dtos/get-all-brands.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    private _BrandRepo: BrandRepository,
    private _ConfigService: ConfigService,
    private _FileService: FileServices,
  ) {}

  //create Brand
  async createBrand(
    file: Express.Multer.File,
    body: Partial<BrandDocument>,
    userId: Types.ObjectId,
  ) {
    const checkCateg = await this._BrandRepo.findOne({
      filter: { name: body.name },
    });
    if (checkCateg)
      throw new ConflictException('A Brand with this name already exists');

    //create empty image folder
    let image = {} as IImage;
    const imageFolderPath = `${this._ConfigService.get('CLOUD_APP_FOLDER')}/brands/${body.name}`;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { folder: imageFolderPath },
        file,
      );
      image = { secure_url, public_id };
    }

    const Brand = await this._BrandRepo.create({
      data: {
        ...body,
        createdBy: userId,
        logo: image,
        folder: imageFolderPath,
      },
    });
    return { messag: 'Brand is created successfully', Brand };
  }
  //get all categories for admins
  async getAllCategories(query: GetAllBrandsDto) {
    const data = await this._BrandRepo.findAll({
      filter: {},
      page: query.page ?? 1,
    });
    return { message: 'All categories fetched successfully', ...data };
  }
  //get single Brand by slug
  async getBrandBySlug(slug: string) {
    const Brand = await this._BrandRepo.findOne({
      filter: { slug },
      populate: { path: 'createdBy', select: 'name email' },
    });
    if (!Brand) throw new NotFoundException('Brand is not found');
    return {
      message: 'Brand data fetched successfully',
      Brand: {
        name: Brand.name,
        image: Brand.logo,
        slug: Brand.slug,
        createdBy: Brand.createdBy,
      },
    };
  }

  //update a Brand for admins
  async updateBrand(
    query: UpdateBrandDto,
    body: UpdateBrandDto,
    file: Express.Multer.File,
  ) {
    let Brand: BrandDocument | null = null;
    if (query.slug) {
      Brand = await this._BrandRepo.findOne({
        filter: { slug: query.slug },
      });
    } else if (query.id) {
      Brand = await this._BrandRepo.findOne({
        filter: { _id: query.id },
      });
    } else {
      throw new BadRequestException('you must provide id or slug of the Brand');
    }
    if (!Brand) throw new NotFoundException('Brand is not found');

    // //if file uploaded , update it on cloudinary
    let image = {} as IImage;
    if (file) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { public_id: Brand.logo?.public_id },
        file,
      );
      image = { secure_url, public_id };
    }

    Brand.name = body.name ? body.name : Brand.name;

    Brand.logo = file ? image : Brand.logo;
    await Brand.save();

    const updatedBrand = await this._BrandRepo.findOne({
      filter: { _id: Brand._id },
    });
    return { message: 'Brand updated successfully', updatedBrand };
  }

  //delete Brand byid for admins
  async deleteBrand(BrandId: Types.ObjectId) {
    const Brand = await this._BrandRepo.findOne({
      filter: { _id: BrandId },
    });
    if (!Brand) throw new NotFoundException('Brand is not found');
    await Brand.deleteOne();
    return { message: 'Brand is deleted successfully.' };
  }
}
