import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentProvider } from 'src/common/providers/payment.provider';

@Module({
  imports: [],
  providers: [PaymentService, PaymentProvider],
  exports: [PaymentService],
})
export class PaymentModule {}
