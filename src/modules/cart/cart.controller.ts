import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UserDocument } from './../../DB/models/user.model';
import { User } from './../../common/decorators/user.decorator';
import { AddProductDto } from './dtos/add-product.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { UserRoles } from '../user/dtos/create-user.dto';
import { Types } from 'mongoose';
import { UpdateProdQuantityDto } from './dtos/update-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add_product')
  addProduct(@Body() body: AddProductDto, @User() user: Partial<UserDocument>) {
    return this.cartService.addProduct(body, user);
  }

  @Get('/get_cart')
  getMyCart(@User('_id') userId: Types.ObjectId) {
    return this.cartService.getCart(userId);
  }

  @Patch('/update_product/:id')
  updateProductQuantity(
    @User('_id') userId: Types.ObjectId,
    @Param('id') productId: Types.ObjectId,
    @Body() body: UpdateProdQuantityDto,
  ) {
    return this.cartService.updateProductQuantity(
      userId,
      productId,
      body.quantity,
    );
  }

  @Delete('/delete_product/:id')
  deleteProduct(
    @Param('id') productId: Types.ObjectId,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.cartService.deleteProduct(productId, userId);
  }

  @Delete('/clear_cart')
  clearCart(@User('_id') userId: Types.ObjectId) {
    return this.cartService.clearCart(userId);
  }
}
