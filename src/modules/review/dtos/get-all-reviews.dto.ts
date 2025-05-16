import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class GetAllReviewsDto {
  @IsOptional()
  @Type(() => Types.ObjectId)
  vendorId?: Types.ObjectId;
}
