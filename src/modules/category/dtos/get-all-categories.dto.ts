import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAllCategoriesDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
