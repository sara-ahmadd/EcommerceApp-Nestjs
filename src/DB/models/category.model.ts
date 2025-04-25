import {
  MongooseModule,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IImage } from 'src/common/types/image.type';
import { UserModelName } from './user.model';
import slugify from 'slugify';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop(raw({ secure_url: String, public_id: String }))
  image: IImage;

  @Prop({ type: Types.ObjectId, ref: UserModelName })
  createdBy: Types.ObjectId;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export const CategoryModelName = Category.name;

export const CategoryModel = MongooseModule.forFeatureAsync([
  {
    name: CategoryModelName,
    useFactory: () => {
      CategorySchema.pre('save', function (next) {
        if (this.isModified(this.name)) {
          this.slug = slugify(this.name);
        }
        next();
      });
      return CategorySchema;
    },
  },
]);

//export type of category document
export type CategoryDocument = HydratedDocument<Category>;
