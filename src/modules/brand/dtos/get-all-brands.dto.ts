import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAllBrandsDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
