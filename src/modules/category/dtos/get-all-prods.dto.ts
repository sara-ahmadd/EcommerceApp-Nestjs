import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAllProductsDto {
  @Type(() => Number)
  @IsOptional()
  page?: number;
}
