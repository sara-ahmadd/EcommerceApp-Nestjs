import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from './../../common/decorators/public.decorator';
import { STRIPE_PAYMENT } from './../../common/providers/payment.provider';
import Stripe from 'stripe';

@Public()
@Controller('/webhook')
export class PaymentController {
  constructor(
    @Inject(STRIPE_PAYMENT) private readonly stripe: Stripe,
    private readonly _ConfigService: ConfigService,
  ) {}
  @Post('/')
  stripeWebHook(
    @Body() body: any,
    @Headers('stripe-signature') stripeSign: string,
  ) {
    let event = body;
    const endpointSecret = this._ConfigService.get('WEB_HOOK_SECRET');
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        stripeSign,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log({ session });
      // ✅ Your logic here: update user/order/payment in DB
    }
  }
}
