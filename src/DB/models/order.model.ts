import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrderStatus } from './../../common/types/orderEnum.type';
import { UserModelName } from './user.model';
import { ProductModelName } from './product.model';
import { PaymentMethods } from './../../common/types/paymentMethods.type';
import { CouponModelName } from './coupon.model';

@Schema({ timestamps: true })
class Order {
  @Prop({ type: Types.ObjectId, ref: UserModelName, required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: ProductModelName },
      quantity: { type: Number },
      price: { type: Number },
    },
  ])
  products: { product: Types.ObjectId; quantity: number; price: number }[];

  @Prop({ type: Number })
  totalCost: number;

  //price after applying coupon if coupon is found
  @Prop({ type: Number })
  finalPrice: number;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.pending })
  status: OrderStatus;

  @Prop({ type: Boolean, default: false })
  paid: boolean;

  @Prop({
    type: String,
    enum: PaymentMethods,
    default: PaymentMethods.card_online,
  })
  paymentMethod: PaymentMethods;

  @Prop({ type: String })
  paymentIntent: string;

  @Prop({ type: Types.ObjectId, ref: CouponModelName })
  coupon: Types.ObjectId;

  @Prop({ type: Number })
  totaQuantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModelName = Order.name;

export const OrderModel = MongooseModule.forFeatureAsync([
  {
    name: OrderModelName,
    useFactory: () => {
      return OrderSchema;
    },
  },
]);

export type OrderDocument = HydratedDocument<Order>;
