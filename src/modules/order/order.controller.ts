import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from './../../common/decorators/user.decorator';
import { Types } from 'mongoose';

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
}
