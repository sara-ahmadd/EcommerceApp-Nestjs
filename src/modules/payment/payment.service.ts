import { Inject, Injectable } from '@nestjs/common';
import { STRIPE_PAYMENT } from './../../common/providers/payment.provider';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@Inject(STRIPE_PAYMENT) private readonly stripe: Stripe) {}
  async CreatePaymentSession({
    line_items,
    customer_email,
    discounts,
    metadata,
  }: Stripe.Checkout.SessionCreateParams) {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      discounts,
      success_url: 'http://localhost:8000/success',
      cancel_url: 'http://localhost:8000/success',
      metadata,
    });
  }

  async CreateCoupon(
    percent_off: number,
  ): Promise<Stripe.Response<Stripe.Coupon>> {
    return await this.stripe.coupons.create({
      currency: 'egp',
      percent_off,
    });
  }
}
