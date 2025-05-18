import { Module } from '@nestjs/common';
import { BrandModule } from '../brand/brand.module';
import { CartModule } from '../cart/cart.module';
import { CategoryModule } from '../category/category.module';
import { CouponModule } from '../coupon/coupon.module';
import { PaymentModule } from '../payment/payment.module';
import { ProductModule } from '../product/product.module';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { UserModule } from '../user/user.module';
import { FileModule } from './../../common/fileUpload/file.module';
import { InvoiceModule } from './../../common/invoice/invoice.module';
import { OrderModel } from './../../DB/models/order.model';
import { OrderController } from './order.controller';
import { OrderRepo } from './order.repository';
import { OrderService } from './order.service';

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
    UserModule,
    FileModule,
    InvoiceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepo],
  exports: [OrderRepo, OrderService],
})
export class OrderModule {}
