import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';
import { UserModelName } from './user.model';
import { ProductModelName } from './product.model';

@Schema({ timestamps: true })
class Review {
  @Prop({ type: Types.ObjectId, ref: UserModelName, required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ProductModelName, required: true })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: String, required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

export const ReviewModelName = Review.name;

export const ReviewModel = MongooseModule.forFeatureAsync([
  {
    name: ReviewModelName,
    useFactory: () => {
      return ReviewSchema;
    },
  },
]);

export type ReviewDocument = HydratedDocument<Review>;
