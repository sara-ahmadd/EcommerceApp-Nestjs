import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsMongoId()
  @IsOptional()
  @Type(() => Types.ObjectId)
  id?: Types.ObjectId;

  @IsString()
  @IsOptional()
  name?: string;
}
