import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { Types } from 'mongoose';
import { AddReviewDto } from './dtos/add-review.dto';
import { OrderService } from '../order/order.service';
import { populate } from 'dotenv';

@Injectable()
export class ReviewService {
  constructor(
    private _ReviewRepo: ReviewRepository,
    private readonly _OrderService: OrderService,
  ) {}

  async addReview(userId: Types.ObjectId, body: AddReviewDto) {
    //check if user bought the product, by checking if product is present in one of its paid orders
    const checkProduct = await this._OrderService.getUserOrders({
      user: userId,
      'products.product': body.productId,
      paid: true,
    });
    if (!checkProduct || !checkProduct?.data?.length)
      throw new BadRequestException('you cannot review this product');

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

  async getAllReviews(vendorId?: Types.ObjectId) {
    let reviews;

    reviews = await this._ReviewRepo.findAll({
      filter: {},
      populate: [
        {
          path: 'product',
          populate: [{ path: 'createdBy', select: 'email name' }],
        },
        {
          path: 'user',
          select: 'email name',
        },
      ],
    });
    if (vendorId) {
      const reviewsForSpecificVendor = reviews.data?.filter(
        (rev) => rev?.product?.createdBy?._id == vendorId,
      );
      return { reviews: reviewsForSpecificVendor };
    }
    return { reviews };
  }
  async getReviewById(reviewId?: Types.ObjectId) {
    const review = await this._ReviewRepo.findOne({
      filter: { _id: reviewId },
      populate: [
        {
          path: 'product',
          populate: [{ path: 'createdBy', select: 'email name' }],
        },
        {
          path: 'user',
          select: 'email name',
        },
      ],
    });

    return { message: 'Review is fteched successfully', review };
  }
  async deleteReviewById(reviewId?: Types.ObjectId) {
    const review = await this._ReviewRepo.removeOne({
      filter: { _id: reviewId },
    });
    if (!review.deletedCount)
      throw new NotFoundException('review is not found');
    return { message: 'Review is deleted successfully' };
  }
}
