import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { generate } from 'otp-generator';
import { BrandRepository } from '../brand/brand.repository';
import { CategoryRepository } from '../category/category.repository';
import { GetAllProductsDto } from '../category/dtos/get-all-prods.dto';
import { SubCategoryRepository } from '../sub-category/SubCategory.repository';
import { FileServices } from './../../common/fileUpload/fileUpload.service';
import { IImage } from './../../common/types/image.type';
import { CreateProductDto } from './dtos/create-product-dto';
import { GetSingleProductDto } from './dtos/get-product.dto';
import { ProductRepo } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private _CategoryRepo: CategoryRepository,
    private _SubCategoryRepo: SubCategoryRepository,
    private _BrandRepo: BrandRepository,
    private _ProductRepo: ProductRepo,
    private _ConfigService: ConfigService,
    private _FileService: FileServices,
  ) {}

  //create product
  async createProduct(
    body: CreateProductDto,
    userId: Types.ObjectId,
    files: { thumbnail: Express.Multer.File[]; images: Express.Multer.File[] },
  ) {
    const { name, price, stock, description, category, subcategory, brand } =
      body;

    //check : category, subcategory, brand
    const checkCategory = await this._CategoryRepo.findOne({
      filter: { _id: new Types.ObjectId(category) },
    });
    if (!checkCategory)
      throw new NotFoundException(
        `Category with this id ${category} is not found`,
      );
    const checkSubCategory = await this._SubCategoryRepo.findOne({
      filter: { _id: new Types.ObjectId(subcategory) },
    });
    if (!checkSubCategory)
      throw new NotFoundException(
        `Subcategory with this id ${subcategory} is not found`,
      );
    const checkBrand = await this._BrandRepo.findOne({
      filter: { _id: new Types.ObjectId(brand) },
    });
    if (!checkBrand)
      throw new NotFoundException(`Brand with this id ${brand} is not found`);

    if (!files.thumbnail?.length)
      throw new BadRequestException('Thumbnail is required');

    let images: IImage[] = [];

    let thumbnail: IImage | undefined;

    const randomeId = generate(10, {
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      digits: true,
    });

    const folder = `${this._ConfigService.get('CLOUD_APP_FOLDER')}/products/${randomeId}`;

    if (files && files.thumbnail) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        { folder },
        files.thumbnail[0],
      );
      thumbnail = { secure_url, public_id };
    }
    if (files && files.images) {
      for (const image of files.images) {
        const { secure_url, public_id } = await this._FileService.uploadFile(
          { folder },
          image,
        );
        images.push({ secure_url, public_id });
      }
    }

    const product = await this._ProductRepo.create({
      data: {
        name,
        description,
        price,
        stock,
        createdBy: userId,
        category: new Types.ObjectId(category),
        sub_category: new Types.ObjectId(subcategory),
        brand: new Types.ObjectId(brand),
        thumbnail,
        images,
      },
    });

    return { message: 'Product is created successfully', product };
  }

  //get product by id
  async getProduct(params: GetSingleProductDto) {
    const product = await this._ProductRepo.findOne({
      filter: { _id: params.id },
      populate: [
        { path: 'createdBy', select: 'name email role' },
        { path: 'category' },
        { path: 'sub_category' },
        { path: 'brand' },
      ],
    });
    if (!product) throw new NotFoundException('product is not found');

    return {
      message: 'Product is fetched successfully',
      product: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        createdBy: product.createdBy,
        category: product.category,
        images: product.images,
        thumbnail: product.thumbnail,
        sub_category: product.sub_category,
        brand: product.brand,
        slug: product.slug,
      },
    };
  }

  //get all products
  async getAllProducts(params: GetAllProductsDto) {
    const products = await this._ProductRepo.findAll({
      filter: {},
      populate: [
        { path: 'createdBy', select: 'name email' },
        { path: 'category', select: 'image name slug' },
        { path: 'sub_category', select: 'image name slug categoryId' },
        { path: 'brand', select: 'logo name slug' },
      ],
      page: params.page ?? 1,
    });
    return { message: 'products are fetched successfully', products };
  }
}
