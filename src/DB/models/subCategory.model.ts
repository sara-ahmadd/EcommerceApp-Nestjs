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
import { CategoryModelName } from './category.model';

@Schema({ timestamps: true })
export class SubCategory {
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

  @Prop({ type: Types.ObjectId, ref: CategoryModelName })
  category: Types.ObjectId;
}

const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

export const SubCategoryModelName = SubCategory.name;

export const SubCategoryModel = MongooseModule.forFeatureAsync([
  {
    name: SubCategoryModelName,
    imports: [FileModule],
    useFactory: (fileServices: FileServices) => {
      SubCategorySchema.pre('save', function (next) {
        if (this.isModified('name')) {
          this.slug = slugify(this.name);
        }
        next();
      });
      SubCategorySchema.post(
        'deleteOne',
        { document: true, query: false },
        async function (doc, next) {
          await fileServices.deleteFolderWithItaAssets(doc.folder);
          next();
        },
      );
      return SubCategorySchema;
    },
    inject: [FileServices],
  },
]);

//export type of SubCategory document
export type SubCategoryDocument = HydratedDocument<SubCategory>;
