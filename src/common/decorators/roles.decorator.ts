import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../modules/user/dtos/create-user.dto';

export const Roles = (...roles: UserRoles[]) => {
  return SetMetadata('roles', roles);
};
