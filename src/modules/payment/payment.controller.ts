import { Controller, Headers, Inject, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from './../../common/decorators/public.decorator';
import { STRIPE_PAYMENT } from './../../common/providers/payment.provider';
import Stripe from 'stripe';
import { Request } from 'express';
import { OrderService } from '../order/order.service';
import { Types } from 'mongoose';
import { CartService } from '../cart/cart.service';

export const config = {
  api: {
    bodyParser: false,
  },
};

@Public()
@Controller('/webhook')
export class PaymentController {
  constructor(
    @Inject(STRIPE_PAYMENT) private readonly stripe: Stripe,
    private readonly _ConfigService: ConfigService,
    private readonly _OrderService: OrderService,
    private readonly _CartService: CartService,
  ) {}
  @Post('/')
  async stripeWebHook(
    @Req() req: Request,
    @Headers('stripe-signature') stripeSign: string,
  ) {
    let event = req.body;
    const endpointSecret = this._ConfigService.get('WEB_HOOK_SECRET');
    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        stripeSign,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️Webhook signature verification failed.`, err.message);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log({ session });
      const orderId = session?.metadata?.orderId;
      //covert oserd.paid to true
      //empty users cart
      const order = await this._OrderService.getOrderById(
        new Types.ObjectId(orderId),
      );
      order.paid = true;

      await order.save();

      const userId = order.user;
      const clearUserCart = await this._CartService.clearCart(userId);
      console.log({ clearUserCart });
    }
  }
}
