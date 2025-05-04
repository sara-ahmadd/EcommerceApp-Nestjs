import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { Types } from 'mongoose';
import { AddReviewDto } from './dtos/add-review.dto';

@Injectable()
export class ReviewService {
  constructor(private _ReviewRepo: ReviewRepository) {}

  async addReview(userId: Types.ObjectId, body: AddReviewDto) {
    //check if user bought the product, by checking if product is present in one of its paid orders

    const review = await this._ReviewRepo.create({
      data: {
        user: userId,
        product: body.productId,
        comment: body.comment,
        rating: body.rating,
      },
    });
    return { message: 'Review is created successfully', review };
  }
}
