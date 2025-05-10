import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @Type(() => Number)
  discount: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @Type(() => Date)
  expiresAt: Date;

  @IsNotEmpty()
  @Type(() => Boolean)
  isPercentage: boolean;

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}
