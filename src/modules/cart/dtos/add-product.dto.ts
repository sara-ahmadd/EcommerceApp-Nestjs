import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AddProductDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  product_id: Types.ObjectId;

  @IsOptional()
  @Type(() => Number)
  quantity?: number;
}
