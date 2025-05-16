import { Module } from '@nestjs/common';
import { OrderModel } from './../../DB/models/order.model';
import { BrandModule } from '../brand/brand.module';
import { CartModule } from '../cart/cart.module';
import { CategoryModule } from '../category/category.module';
import { CouponModule } from '../coupon/coupon.module';
import { ProductModule } from '../product/product.module';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { OrderController } from './order.controller';
import { OrderRepo } from './order.repository';
import { OrderService } from './order.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    CouponModule,
    OrderModel,
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    ProductModule,
    CartModule,
    PaymentModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepo],
  exports: [OrderRepo, OrderService],
})
export class OrderModule {}
