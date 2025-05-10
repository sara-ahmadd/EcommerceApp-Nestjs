import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from './../../DB/db.repository';
import { OrderDocument, OrderModelName } from './../../DB/models/order.model';

export class OrderRepo extends AbstractDBRepository<OrderDocument> {
  constructor(@InjectModel(OrderModelName) Order: Model<OrderDocument>) {
    super(Order);
  }
}
