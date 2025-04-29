import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IImage } from './../../../common/types/image.type';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId({ message: 'Invalid mongo id!!' })
  @IsNotEmpty({ message: 'Category id must be provided in the body' })
  @Type(() => Types.ObjectId)
  categoryId: string;
}
