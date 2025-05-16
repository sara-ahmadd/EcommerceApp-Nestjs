import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewModel } from './../../DB/models/review.model';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [ReviewModel, OrderModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
