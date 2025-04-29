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
export class Brand {
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
  logo: IImage;

  @Prop({ type: Types.ObjectId, ref: UserModelName })
  createdBy: Types.ObjectId;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export const BrandModelName = Brand.name;

export const BrandModel = MongooseModule.forFeatureAsync([
  {
    name: BrandModelName,
    imports: [FileModule],
    useFactory: (fileServices: FileServices) => {
      BrandSchema.pre('save', function (next) {
        if (this.isModified('name')) {
          this.slug = slugify(this.name);
        }
        next();
      });
      BrandSchema.post(
        'deleteOne',
        { document: true, query: false },
        async function (doc, next) {
          await fileServices.deleteFolderWithItaAssets(doc.folder);
          next();
        },
      );
      return BrandSchema;
    },
    inject: [FileServices],
  },
]);

//export type of Brand document
export type BrandDocument = HydratedDocument<Brand>;
