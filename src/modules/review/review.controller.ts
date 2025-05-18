import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Roles } from './../../common/decorators/roles.decorator';
import { User } from './../../common/decorators/user.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { AddReviewDto } from './dtos/add-review.dto';
import { GetAllReviewsDto } from './dtos/get-all-reviews.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles(UserRoles.customer)
  @Post('/')
  addReview(@Body() body: AddReviewDto, @User('_id') userId: Types.ObjectId) {
    return this.reviewService.addReview(userId, body);
  }

  @Roles(UserRoles.admin)
  @Get('/all')
  getAllReviews(@Query() query: GetAllReviewsDto) {
    return this.reviewService.getAllReviews(query.vendorId);
  }
}
