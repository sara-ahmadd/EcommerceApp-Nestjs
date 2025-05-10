import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { User } from './../../common/decorators/user.decorator';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dtos/create-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Roles(UserRoles.admin)
  @Post('/create')
  createCoupon(
    @Body() body: CreateCouponDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.couponService.createCoupon(body, userId);
  }

  @Roles(UserRoles.admin)
  @Get('/:code')
  getCoupon(@Param('code') code: string) {
    return this.couponService.getCouponByCode(code);
  }
}
