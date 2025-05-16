import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentProvider } from './../../common/providers/payment.provider';
import { PaymentController } from './payment.controller';

@Module({
  imports: [],
  providers: [PaymentService, PaymentProvider, PaymentController],
  exports: [PaymentService, PaymentController],
})
export class PaymentModule {}
