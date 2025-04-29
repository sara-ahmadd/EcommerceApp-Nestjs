import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../modules/user/dtos/create-user.dto';
import { UserService } from '../../modules/user/user.service';

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
