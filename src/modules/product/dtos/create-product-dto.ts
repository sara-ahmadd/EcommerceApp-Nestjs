import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

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
  @IsMongoId()
  sub_category?: string;
  @IsMongoId()
  @IsNotEmpty()
  brand: string;
}
