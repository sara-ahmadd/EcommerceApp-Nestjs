import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateProdQuantityDto {
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;
}
