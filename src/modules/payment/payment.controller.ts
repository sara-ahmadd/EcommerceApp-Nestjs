import { Controller, Headers, Inject, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from './../../common/decorators/public.decorator';
import { STRIPE_PAYMENT } from './../../common/providers/payment.provider';
import Stripe from 'stripe';
import { Request } from 'express';
import { OrderService } from '../order/order.service';
import { Types } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';

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
    private readonly _ProductService: ProductService,
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
      const paymentIntent = session?.payment_intent;

      await this._OrderService.checkoutCompleted(orderId!, paymentIntent);
    }
  }
}
