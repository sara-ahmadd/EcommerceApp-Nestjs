import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from '../../DB/db.repository';
import {
  SubCategoryDocument,
  SubCategoryModelName,
} from '../../DB/models/subCategory.model';

export class SubCategoryRepository extends AbstractDBRepository<SubCategoryDocument> {
  constructor(
    @InjectModel(SubCategoryModelName) SubCategory: Model<SubCategoryDocument>,
  ) {
    super(SubCategory);
  }
}
