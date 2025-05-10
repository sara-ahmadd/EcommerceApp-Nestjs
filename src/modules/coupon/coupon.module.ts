import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponModel } from './../../DB/models/coupon.model';
import { CouponRepo } from './coupon.repository';

@Module({
  imports: [CouponModel],
  controllers: [CouponController],
  providers: [CouponService, CouponRepo],
  exports: [CouponRepo, CouponService],
})
export class CouponModule {}
