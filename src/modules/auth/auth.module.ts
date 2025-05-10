import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { CartService } from '../cart/cart.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CartModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, CartService],
})
export class AuthModule {}
