import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, context) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user;
  return data ? user[data] : user;
});
