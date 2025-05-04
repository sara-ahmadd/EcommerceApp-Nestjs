import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @Type(() => Number)
  @IsNotEmpty()
  price: number;
  @Type(() => Number)
  @IsNotEmpty()
  stock: number;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  sub_category?: Types.ObjectId | undefined | string;

  @IsMongoId()
  @IsNotEmpty()
  brand: string;
}
