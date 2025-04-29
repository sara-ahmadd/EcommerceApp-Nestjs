import {
  MongooseModule,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IImage } from './../../common/types/image.type';
import { UserModelName } from './user.model';
import slugify from 'slugify';
import { HydratedDocument } from 'mongoose';
import { FileServices } from './../../common/fileUpload/fileUpload.service';
import { FileModule } from './../../common/fileUpload/file.module';

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  folder: string;

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
    imports: [FileModule],
    useFactory: (fileServices: FileServices) => {
      CategorySchema.pre('save', function (next) {
        if (this.isModified('name')) {
          this.slug = slugify(this.name);
        }
        next();
      });
      CategorySchema.post(
        'deleteOne',
        { document: true, query: false },
        async function (doc, next) {
          await fileServices.deleteFolderWithItaAssets(doc.folder);
          next();
        },
      );
      return CategorySchema;
    },
    inject: [FileServices],
  },
]);

//export type of category document
export type CategoryDocument = HydratedDocument<Category>;
