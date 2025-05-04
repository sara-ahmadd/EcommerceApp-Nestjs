import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from './../../DB/db.repository';
import { CartDocument, CartModelName } from './../../DB/models/cart.model';

export class CartRepo extends AbstractDBRepository<CartDocument> {
  constructor(@InjectModel(CartModelName) _CartModel: Model<CartDocument>) {
    super(_CartModel);
  }
}
