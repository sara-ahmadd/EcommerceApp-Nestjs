import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from '../../DB/db.repository';
import { BrandDocument, BrandModelName } from '../../DB/models/brand.model';

export class BrandRepository extends AbstractDBRepository<BrandDocument> {
  constructor(@InjectModel(BrandModelName) Brand: Model<BrandDocument>) {
    super(Brand);
  }
}
