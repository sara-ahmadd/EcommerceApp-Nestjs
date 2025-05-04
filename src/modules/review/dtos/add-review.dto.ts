import { IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: Types.ObjectId;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
