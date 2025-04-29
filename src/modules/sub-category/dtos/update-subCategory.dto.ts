import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IImage } from '../../../common/types/image.type';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateSubCategoryDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsMongoId()
  @IsOptional()
  @Type(() => Types.ObjectId)
  id?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @Type(() => Types.ObjectId)
  categoryId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  name?: string;
}
