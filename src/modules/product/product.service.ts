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
import { IFiles } from './product.controller';
import { UpdateProdDto } from './dtos/update-prod.dto';
import { maxProductImagesLength } from './../../DB/models/product.model';
import { User, UserDocument } from './../../DB/models/user.model';
import { DeleteProdImageDto } from './dtos/delete-img.dto';

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
    files: IFiles,
  ) {
    const { name, price, stock, description, category, sub_category, brand } =
      body;

    //check : category, subcategory, brand
    const checkCategory = await this._CategoryRepo.findOne({
      filter: { _id: new Types.ObjectId(category) },
    });
    if (!checkCategory)
      throw new NotFoundException(
        `Category with this id ${category} is not found`,
      );
    if (sub_category) {
      const checkSubCategory = await this._SubCategoryRepo.findOne({
        filter: { _id: new Types.ObjectId(sub_category) },
      });
      if (!checkSubCategory)
        throw new NotFoundException(
          `Subcategory with this id ${sub_category} is not found`,
        );
    }
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
        sub_category: sub_category ? new Types.ObjectId(sub_category) : '',
        brand: new Types.ObjectId(brand),
        thumbnail,
        images,
        folder,
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

  //update product by id
  async updateProduct(
    body: UpdateProdDto,
    productId: Types.ObjectId,
    files: IFiles,
    user: Partial<UserDocument>,
  ) {
    const { name, description, stock, price, category, sub_category, brand } =
      body;

    const product = await this._ProductRepo.findOne({
      filter: { _id: productId, createdBy: user._id },
    });
    if (!product) {
      throw new NotFoundException(
        `product with this name : ${name} & created by : ${user.email} is not found`,
      );
    }

    let thubmnail: IImage | undefined;
    if (files && files.thumbnail && files.thumbnail.length > 0) {
      const { secure_url, public_id } = await this._FileService.uploadFile(
        {
          public_id: product.thumbnail.public_id,
        },
        files.thumbnail[0],
      );
      thubmnail = { secure_url, public_id };
    }

    let newImages: IImage[] = [];

    //check the available number of images in the product
    const imgsLength = product.images.length || 0;

    if (files && files.images) {
      if (files.images.length > maxProductImagesLength - imgsLength) {
        throw new BadRequestException(
          'This exceeds maximum number of images permited for each product, delete some of current images first',
        );
      } else {
        for (const image of files.images) {
          const { secure_url, public_id } = await this._FileService.uploadFile(
            { folder: product.folder },
            image,
          );
          newImages.push({ secure_url, public_id });
        }
      }
    }
    const updatedProduct = await this._ProductRepo.updateOne({
      filter: { _id: productId },
      updatedFields: {
        name: name ? name : product.name,
        description: description ? description : product.description,
        stock: stock ? stock : product.stock,
        price: price ? price : product.price,
        category: category ? category : product.category,
        sub_category: sub_category ? sub_category : product.sub_category,
        brand: brand ? brand : product.brand,
        thubmnail: thubmnail ? thubmnail : product.thumbnail,
        images: newImages.length
          ? [...product.images, ...newImages]
          : product.images,
      },
    });

    return { message: 'Product is updated successfully', updatedProduct };
  }

  //delete image from product
  async deleteImageProd(
    body: DeleteProdImageDto,
    productId: Types.ObjectId,

    user: Partial<UserDocument>,
  ) {
    const { image } = body;
    const product = await this._ProductRepo.findOne({
      filter: {
        _id: productId,
        createdBy: user._id,
        $or: [
          { 'thumbnail.public_id': image.public_id },
          { 'images.public_id': image.public_id },
        ],
      },
    });

    if (!product) {
      throw new NotFoundException(
        `product is not found or this image does not belong to it`,
      );
    }

    if (image.public_id === product.thumbnail.public_id) {
      if (product.images.length > 0) {
        //replace thumbnail with the first image of product images
        product.thumbnail = product.images[0];
        //remove thumbnail image from images
        product.images.shift();
        //delete old thumbnail from cloudinary
        const deleteedImg = await this._FileService.deleteFile(image.public_id);
        console.log(deleteedImg);
        await product.save();
      } else {
        throw new BadRequestException(
          'there must be images available in the product to be able to delete thumbnail image',
        );
      }
    } else {
      const updatedImages = product.images.filter(
        (img) => img.public_id !== image.public_id,
      );
      product.images = updatedImages;
      await product.save();
      //delete old thumbnail from cloudinary
      const deleteedImg = await this._FileService.deleteFile(image.public_id);
      console.log(deleteedImg);
    }
    return { message: 'Image is deleted successfully' };
  }

  //delete product by id
  async deleteProduct(productId: Types.ObjectId, user: Partial<UserDocument>) {
    const product = await this._ProductRepo.findOne({
      filter: { _id: productId, createdBy: user._id },
    });
    if (!product) {
      throw new NotFoundException(
        `product with this id : ${productId} & created by : ${user.email} is not found`,
      );
    }

    await product.deleteOne();
    return { message: 'Product is deleted successfully' };
  }
}
