import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDocument } from './../../DB/models/user.model';
import { CartRepo } from './cart.repository';
import { AddProductDto } from './dtos/add-product.dto';

@Injectable()
export class CartService {
  constructor(private _CartRepo: CartRepo) {}
  async createCart(userId: Types.ObjectId) {
    await this._CartRepo.create({
      data: { user: userId, products: [] },
    });
  }

  async getCart(userId: Types.ObjectId) {
    const cart = await this._CartRepo.findOne({
      filter: { user: userId },
      populate: {
        path: 'products.product',
        populate: [
          { path: 'category', select: 'name image' },
          { path: 'brand', select: 'name logo' },
        ],
      },
    });
    return { message: 'Cart is fetched successfully', cart };
  }

  async addProduct(body: AddProductDto, user: Partial<UserDocument>) {
    const cart = await this._CartRepo.findOne({ filter: { user: user._id } });
    const checkProduct = cart?.products.find(
      (item) => String(item.product) === String(body.product_id),
    );
    if (!checkProduct) {
      cart?.products.push({ product: body.product_id, quantity: 1 });
      await cart?.save();
      const updatedCart = await this._CartRepo.findOne({
        filter: { user: user._id },
      });
      return { message: 'Product is added successfully', updatedCart };
    }

    await this._CartRepo.updateOne({
      filter: { user: user._id, 'products.product': body.product_id },
      updatedFields: {
        $set: { 'products.$.quantity': checkProduct?.quantity + 1 },
      },
    });

    const updatedCart = await this._CartRepo.findOne({
      filter: { user: user._id },
    });
    return { message: 'Product quantity is updated successfully', updatedCart };
  }

  async updateProductQuantity(
    userId: Types.ObjectId,
    productId: Types.ObjectId,
    updatedQuantity: number,
  ) {
    const updatedCart = await this._CartRepo.updateOne({
      filter: { user: userId, 'products.product': productId },
      updatedFields: {
        $set: { 'products.$.quantity': updatedQuantity },
      },
    });
    if (!updatedCart) {
      throw new NotFoundException('Cart is empty or product doesnot exist');
    }
    return {
      message: 'Product quantity is updated successfully',
      updatedCart,
    };
  }

  async deleteProduct(productId: Types.ObjectId, userId: Types.ObjectId) {
    const updatedCart = await this._CartRepo.updateOne({
      filter: { user: userId, 'products.product': productId },
      updatedFields: {
        $pull: { products: { product: productId } },
      },
    });
    if (!updatedCart) {
      throw new NotFoundException('Cart is empty or product doesnot exist');
    }
    return {
      message: 'Product is deleted successfully',
      updatedCart,
    };
  }

  async clearCart(userId: Types.ObjectId) {
    await this._CartRepo.updateOne({
      filter: { user: userId },
      updatedFields: { products: [] },
    });
    return { message: 'Cart is cleared successfully' };
  }
}
