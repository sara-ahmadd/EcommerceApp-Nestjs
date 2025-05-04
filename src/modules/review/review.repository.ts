import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractDBRepository } from '../../DB/db.repository';
import {
  ReviewDocument,
  ReviewModelName,
} from './../../DB/models/review.model';

export class ReviewRepository extends AbstractDBRepository<ReviewDocument> {
  constructor(@InjectModel(ReviewModelName) Review: Model<ReviewDocument>) {
    super(Review);
  }
}
