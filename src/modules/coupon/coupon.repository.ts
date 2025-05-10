import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from '../../DB/db.repository';
import { CouponDocument, CouponModelName } from '../../DB/models/coupon.model';

export class CouponRepo extends AbstractDBRepository<CouponDocument> {
  constructor(@InjectModel(CouponModelName) Coupon: Model<CouponDocument>) {
    super(Coupon);
  }
}
