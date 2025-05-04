import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepo } from './cart.repository';
import { CartModel } from './../../DB/models/cart.model';

@Module({
  imports: [CartModel],
  controllers: [CartController],
  providers: [CartService, CartRepo],
  exports: [CartRepo],
})
export class CartModule {}
