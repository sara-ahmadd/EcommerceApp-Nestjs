import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from './../../DB/db.repository';
import {
  CategoryDocument,
  CategoryModelName,
} from './../../DB/models/category.model';

export class CategoryRepository extends AbstractDBRepository<CategoryDocument> {
  constructor(
    @InjectModel(CategoryModelName) category: Model<CategoryDocument>,
  ) {
    super(category);
  }
}
