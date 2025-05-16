import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from './../../common/decorators/user.decorator';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('/create')
  createOrder(
    @Body() body: CreateOrderDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.orderService.createOrder(userId, body);
  }

  @Get('/get_order/:id')
  getOrderById(@Param('id') orderId: Types.ObjectId) {
    return this.orderService.getOrderById(orderId);
  }

  @Get('/all')
  getOrders(@User('_id') userId: Types.ObjectId) {
    return this.orderService.getAllOrders(userId);
  }

  @Patch('/cancel/:id')
  cancelOrder(
    @User('_id') userId: Types.ObjectId,
    @Param('id', ParseObjectIdPipe) orderId: Types.ObjectId,
  ) {
    return this.orderService.cancelOrder(orderId, userId);
  }
}
