import { Controller, Get } from '@nestjs/common';
import { User } from './../../common/decorators/user.decorator';
import { UserDocument } from './../../DB/models/user.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private _UserService: UserService) {}

  @Get('/profile')
  getUserProfile(@User() user: Partial<UserDocument>) {
    return this._UserService.getUserProfile(user);
  }
}
