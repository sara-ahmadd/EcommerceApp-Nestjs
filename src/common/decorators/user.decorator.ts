import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, context) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user;
  //get all user object or just some data
  return data ? user[data] : user;
});
