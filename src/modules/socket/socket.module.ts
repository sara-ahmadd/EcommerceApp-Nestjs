import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { StockGateway } from './stock.gateway';

@Module({
  providers: [StockGateway],
  exports: [StockGateway],
  imports: [UserModule],
})
export class SocketModule {}
