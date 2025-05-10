import { BadRequestException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { verifyToken } from './../../utils/token';
import { UserService } from '../user/user.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly _UserService: UserService) {}
  socketMap = new Map();
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);

    const auth: string = client.handshake.auth.authoriaztion;
    if (!auth || !auth.startsWith('Bearer')) {
      throw new BadRequestException('invalid token');
    }
    console.log(auth);
    const token = auth.split(' ')[1];
    if (!token) throw new BadRequestException('Token is required');
    const payload = verifyToken(token);
    if (!payload) throw new BadRequestException('token is invalid');
    const { id } = payload;
    // this function already check if the user is available
    const user = await this._UserService.getUser({ filter: { _id: id } });

    client.data.user = user;
    this.socketMap.set(user?.id, client);
  }

  handleDisconnect(client: any) {
    this.socketMap.delete(client.data.user.id);
  }

  async broadCastUpdateStock(productId: Types.ObjectId, newStock: number) {
    this.server.emit('stock-update', { productId, stock: newStock });
  }
}
