import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AddReviewDto } from './dtos/add-review.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Types } from 'mongoose';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { GetAllReviewsDto } from './dtos/get-all-reviews.dto';

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
