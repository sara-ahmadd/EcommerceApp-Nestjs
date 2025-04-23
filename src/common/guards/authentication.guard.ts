import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';
import { verifyToken } from 'src/utils/token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private _userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(isPublic);
    if (isPublic) {
      return true;
    }
    try {
      const ctx = context.switchToHttp();
      const req: Request = ctx.getRequest();
      const authorization = req?.headers?.authorization?.split(' ');
      const token = authorization?.[1];
      // console.log(token);
      if (!token) throw new BadRequestException('token is required');
      const payload = verifyToken(token!);
      const user = await this._userService.getUer({
        filter: { _id: payload.id },
      });
      if (!user) throw new NotFoundException('user is not found');
      const request = ctx.getRequest();
      request.user = user;
      console.log(user);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
