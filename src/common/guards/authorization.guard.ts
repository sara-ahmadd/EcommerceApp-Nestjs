import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRoles } from 'src/modules/user/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { verifyToken } from 'src/utils/token';

@Injectable()
export class AuthorizationGuard implements CanActivate {
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
    const roles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

    try {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest();
      const user = req.user;
      const role = user?.role;

      return roles?.includes(role as UserRoles);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
