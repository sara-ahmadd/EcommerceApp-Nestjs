import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CartService } from '../cart/cart.service';
import { OrderRepo } from './order.repository';
import { CouponService } from '../coupon/coupon.service';
import { ProductService } from '../product/product.service';
import { PaymentMethods } from './../../common/types/paymentMethods.type';

@Injectable()
export class OrderService {
  constructor(
    private _CartService: CartService,
    private _CouponService: CouponService,
    private _OrderRepo: OrderRepo,
    private _ProductService: ProductService,
  ) {}
  async createOrder(userId: Types.ObjectId, body: CreateOrderDto) {
    const { paymentMethod, coupon } = body;
    let getCoupon: any;
    if (coupon) {
      getCoupon = await this._CouponService.getCouponByCode(coupon);
      if (!getCoupon) {
        throw new NotFoundException('coupo is not found');
      }
    }

    const userCart = await this._CartService.getCart(userId);

    if (!userCart.cart?.products || userCart.cart?.products.length == 0) {
      throw new BadRequestException('Your cart is empty');
    }
    //check stock of all prods in user cart before creating order
    //products hrer are populated so i get all data of each product not only its id
    for (const item of userCart.cart?.products) {
      if (item.product.stock == 0)
        throw new BadRequestException(
          `Thpe product : ${item.product.id} > ${item.product.name} is out of stock`,
        );

      const prodCheck = item.product.stock >= item.quantity;
      if (!prodCheck) {
        throw new BadRequestException(
          `only ${item.product.stock} pieces are available of the product : ${item.product.id} [${item.product.name}]`,
        );
      }
    }
    let totalCost = 0;
    let totalAmount = 0;
    for (const product of userCart.cart?.products) {
      totalCost += product.product.price * product.quantity;
      totalAmount += product.quantity;
    }

    const cart = userCart.cart?.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
    }));

    const couponDiscount = getCoupon?.coupon.discount;
    const isPercent = getCoupon?.coupon.isPercentage;
    //create order
    const order = await this._OrderRepo.create({
      data: {
        user: userId,
        products: cart,
        totaQuantity: totalAmount,
        totalCost,
        ...(paymentMethod && { paymentMethod: paymentMethod }),
        ...(coupon && { coupon: getCoupon.coupon._id }),
        finalPrice:
          coupon && getCoupon
            ? isPercent
              ? totalCost - (totalCost * couponDiscount) / 100
              : totalCost - couponDiscount
            : totalCost,
      },
    });

    if (order.paymentMethod === PaymentMethods.cash) {
      //update stock of all products in the order
      for (const prod of cart) {
        //update product stock on DB and notify all users with the new stock using socketio
        await this._ProductService.updateProductStock(
          prod.product,
          prod.quantity,
          false,
        );
      }
      //clear user cart after order is created successfully
      await this._CartService.clearCart(userId);
    }
    return {
      message: 'Order is created successfully',
      order,
    };
  }
}
