import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from './../../DB/db.repository';
import {
  ProductDocument,
  ProductModelName,
} from './../../DB/models/product.model';

export class ProductRepo extends AbstractDBRepository<ProductDocument> {
  constructor(@InjectModel(ProductModelName) product: Model<ProductDocument>) {
    super(product);
  }
}
