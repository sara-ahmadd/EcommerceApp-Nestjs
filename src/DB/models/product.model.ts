import {
  MongooseModule,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';
import { IImage } from './../../common/types/image.type';
import { UserModelName } from './user.model';
import { CategoryModelName } from './category.model';
import { SubCategoryModelName } from './subCategory.model';
import { BrandModelName } from './brand.model';
import slugify from 'slugify';
import { FileServices } from './../../common/fileUpload/fileUpload.service';
import { FileModule } from './../../common/fileUpload/file.module';

export const maxProductImagesLength = 4;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
    set: function (value) {
      this.slug = slugify(value);
      return value;
    },
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    min: 1,
    required: true,
    set: function (value: number) {
      this.finalPrice = value;
      return value;
    },
  })
  price: number;

  @Prop({ type: Number, min: 1, required: true })
  stock: number;

  @Prop({ type: Number, min: 1 })
  rating: number;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  folder: string;

  @Prop([{ secure_url: String, public_id: String }])
  images: IImage[];

  @Prop({ type: { secure_url: String, public_id: String } })
  thumbnail: IImage;

  @Prop({ type: Types.ObjectId, ref: CategoryModelName })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: SubCategoryModelName, required: false })
  sub_category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: BrandModelName })
  brand: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: UserModelName })
  createdBy: Types.ObjectId;

  @Prop(
    raw({
      amount: { type: Number },
      isPercentage: { type: Boolean },
    }),
  )
  discount: { amount: number; isPercentage: boolean };

  @Prop({ type: Number })
  finalPrice: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModelName = Product.name;

export const ProductModel = MongooseModule.forFeatureAsync([
  {
    name: ProductModelName,
    useFactory: (_FileService: FileServices) => {
      ProductSchema.post(
        'deleteOne',
        { document: true, query: false },
        async function (doc, next) {
          await _FileService.deleteFolderWithItaAssets(doc.folder);
          next();
        },
      );
      ProductSchema.pre('save', function (next) {
        this.finalPrice =
          this.discount.amount > 0
            ? this.price - (this.price * this.discount.amount) / 100
            : this.price;
        next();
      });
      return ProductSchema;
    },
    inject: [FileServices],
    imports: [FileModule],
  },
]);

export type ProductDocument = HydratedDocument<Product>;
