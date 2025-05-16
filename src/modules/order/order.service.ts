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
import { PaymentService } from '../payment/payment.service';
import { IStripeLineItems } from './../../common/types/stripeLineItems.type';
import { CouponDocument } from './../../DB/models/coupon.model';

@Injectable()
export class OrderService {
  constructor(
    private readonly _CartService: CartService,
    private readonly _CouponService: CouponService,
    private readonly _OrderRepo: OrderRepo,
    private readonly _ProductService: ProductService,
    private readonly _PaymentService: PaymentService,
  ) {}
  async createOrder(userId: Types.ObjectId, body: CreateOrderDto) {
    const { paymentMethod, coupon } = body;
    let getCoupon:
      | {
          message: string;
          coupon: Partial<CouponDocument>;
        }
      | undefined = undefined as
      | {
          message: string;
          coupon: Partial<CouponDocument>;
        }
      | undefined;
    if (coupon) {
      getCoupon = await this._CouponService.getCouponByCode(coupon);
      if (!getCoupon) {
        throw new NotFoundException('coupon is not found');
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
    const cart: any[] = [];

    //get line items array for card payment method (handeled using stripe)
    const line_items: IStripeLineItems[] = [];

    for (const product of userCart.cart?.products) {
      totalCost +=
        (product.product.finalPrice || product.product.price) *
        product.quantity;
      totalAmount += product.quantity;

      cart.push({
        product: product.product._id,
        quantity: product.quantity,
        price:
          (product.product.finalPrice || product.product.price) *
          product.quantity,
      });

      line_items.push({
        price_data: {
          currency: 'egp',
          unit_amount:
            (product.product.finalPrice || product.product.price) * 100,
          product_data: {
            name: product.product.name,
            images: [...product.product.images.map((img) => img.secure_url)],
          },
        },
        quantity: product.quantity,
      });
    }

    const couponDiscount = getCoupon?.coupon.discount;
    const isPercent = getCoupon?.coupon?.isPercentage;
    //create order
    const order = await this._OrderRepo.create({
      data: {
        user: userId,
        products: cart,
        totaQuantity: totalAmount,
        totalCost,
        ...(paymentMethod && { paymentMethod: paymentMethod }),
        ...(coupon && { coupon: getCoupon?.coupon._id }),
        finalPrice:
          coupon && getCoupon
            ? isPercent
              ? totalCost - (totalCost * (couponDiscount || 0)) / 100
              : totalCost - (couponDiscount || 0)
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
      return {
        message: 'Order is created successfully',
        order,
      };
    }
    const session = await this.CardPayment({
      line_items,
      orderId: order.id,
      ...(coupon && { coupon: couponDiscount }),
    });
    return {
      message: 'Order is created successfully',
      session: session.url,
      order,
    };
  }

  async CardPayment({
    line_items,
    orderId,
    customer_email,
    coupon,
  }: {
    line_items: IStripeLineItems[];
    orderId: string;
    customer_email?: string;
    coupon?: number;
  }) {
    let stripeCoupon;
    if (coupon && coupon > 0) {
      stripeCoupon = await this._PaymentService.CreateCoupon(coupon);
    }

    return await this._PaymentService.CreatePaymentSession({
      line_items,
      ...(customer_email && { customer_email }),
      ...(stripeCoupon && { discounts: [{ coupon: stripeCoupon.id }] }),
      metadata: {
        orderId,
      },
    });
  }

  async getOrderById(orderId: Types.ObjectId) {
    const order = await this._OrderRepo.findOne({ filter: { _id: orderId } });

    if (!order) {
      throw new NotFoundException('Order is not found');
    }
    return order;
  }
}
