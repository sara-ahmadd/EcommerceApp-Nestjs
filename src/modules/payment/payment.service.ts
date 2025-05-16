import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

  async refund(payment_intent) {
    return this.stripe.refunds.create({ payment_intent });
  }

  async createInvoice(userEmail: string, amount: number, msg: string) {
    const customerId = (
      await this.stripe.customers.create({ email: userEmail })
    ).id;

    // Create the invoice
    const invoice = await this.stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      days_until_due: 7,
    });
    if (!invoice) throw new BadRequestException('invoice cannot be created');
    // Finalize the invoice to generate the hosted link
    const finalizedInvoice = await this.stripe.invoices.finalizeInvoice(
      invoice?.id!,
    );

    // Return the hosted invoice URL
    return finalizedInvoice.hosted_invoice_url;
  }
}
