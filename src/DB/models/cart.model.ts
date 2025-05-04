import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserModelName } from './user.model';
import { ProductModelName } from './product.model';

@Schema({ timestamps: true })
class Cart {
  @Prop({ type: Types.ObjectId, ref: UserModelName })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: ProductModelName },
      quantity: { type: Number },
    },
  ])
  products: { product: Types.ObjectId; quantity: number }[];
}

export const CartModelName = Cart.name;

export const CartSchema = SchemaFactory.createForClass(Cart);

export const CartModel = MongooseModule.forFeatureAsync([
  {
    name: CartModelName,
    useFactory: () => {
      return CartSchema;
    },
  },
]);

export type CartDocument = HydratedDocument<Cart>;
