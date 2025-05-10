import { Injectable, NotFoundException } from '@nestjs/common';
import { CouponRepo } from './coupon.repository';
import { CreateCouponDto } from './dtos/create-coupon.dto';
import { Types } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(private _CouponRepo: CouponRepo) {}
  async createCoupon(body: CreateCouponDto, userId: Types.ObjectId) {
    const coupon = await this._CouponRepo.create({
      data: {
        user: userId,
        code: body.code,
        discount: body.discount,
        ...(body.isActive && { isActive: body.isActive }),
        expiresAt: body.expiresAt,
        isPercentage: body.isPercentage,
      },
    });
    return { message: 'Coupon is created successfully', coupon };
  }
  async getCouponByCode(code: string) {
    const coupon = await this._CouponRepo.findOne({ filter: { code } });
    if (!coupon) {
      throw new NotFoundException(`Coupon with this code ${code} is not found`);
    }
    return { message: 'Coupon data if fetched sucessfully', coupon };
  }
}
