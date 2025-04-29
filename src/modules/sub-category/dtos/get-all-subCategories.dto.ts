import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAllSubCategoriesDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
