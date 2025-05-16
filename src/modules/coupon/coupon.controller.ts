import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { User } from './../../common/decorators/user.decorator';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dtos/create-coupon.dto';

@Roles(UserRoles.admin)
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/create')
  createCoupon(
    @Body() body: CreateCouponDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.couponService.createCoupon(body, userId);
  }

  @Get('/get_coupon/:code')
  getCoupon(@Param('code') code: string) {
    return this.couponService.getCouponByCode(code);
  }

  @Delete('/delete_coupon/:id')
  deleteCoupon(@Param('id') couponId: Types.ObjectId) {
    return this.couponService.deleteCouponByCode(couponId);
  }

  @Get('/all')
  getAllCoupons() {
    return this.couponService.getAllCoupuns();
  }

  @Patch('/activate/:id')
  activateCoupon(
    @Param('id') couponId: Types.ObjectId,
    @Query('state', ParseBoolPipe) state: boolean,
  ) {
    return this.couponService.activateCoupon(couponId, state);
  }
}
