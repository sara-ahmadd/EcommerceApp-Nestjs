import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GetSingleProductDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  id: Types.ObjectId;
}
