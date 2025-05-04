import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserModel } from './../../DB/models/user.model';
import { CartService } from '../cart/cart.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [UserModel, CartModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, CartService],
})
export class AuthModule {}
