import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethods } from './../../../common/types/paymentMethods.type';

export class CreateOrderDto {
  @IsEnum(PaymentMethods)
  @IsOptional()
  paymentMethod: PaymentMethods;

  @IsOptional()
  @IsString()
  coupon?: string;
}
