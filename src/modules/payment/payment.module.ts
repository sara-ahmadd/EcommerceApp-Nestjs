import { forwardRef, Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PaymentProvider } from './../../common/providers/payment.provider';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => OrderModule), CartModule, ProductModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProvider],
  exports: [PaymentService],
})
export class PaymentModule {}
