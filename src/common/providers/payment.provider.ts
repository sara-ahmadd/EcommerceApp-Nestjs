import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

export const STRIPE_PAYMENT = 'STRIPE_PAYMENT';

export const PaymentProvider = {
  provide: STRIPE_PAYMENT,
  useFactory: (_ConfigService: ConfigService) => {
    return new Stripe(_ConfigService.get('SECRET_KEY')!);
  },
  inject: [ConfigService],
};
