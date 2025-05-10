import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserModelName } from './user.model';

@Schema({ timestamps: true })
class Coupon {
  @Prop({ type: Types.ObjectId, ref: UserModelName, required: true })
  user: Types.ObjectId;

  @Prop({ type: String, unique: true, required: true })
  code: string;

  @Prop({ type: Number })
  discount: number;

  @Prop({ type: Boolean })
  isPercentage: boolean;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

export const CouponModelName = Coupon.name;

export const CouponModel = MongooseModule.forFeatureAsync([
  {
    name: CouponModelName,
    useFactory: () => {
      return CouponSchema;
    },
  },
]);

export type CouponDocument = HydratedDocument<Coupon>;
