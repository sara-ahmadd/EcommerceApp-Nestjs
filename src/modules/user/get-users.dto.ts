import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
