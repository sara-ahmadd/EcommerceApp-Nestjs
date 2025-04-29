import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { User } from './../../common/decorators/user.decorator';
import { UserDocument } from './../../DB/models/user.model';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Roles } from '././../../common/decorators/roles.decorator';
import { UserRoles } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';

@Controller('/user')
export class UserController {
  constructor(private _UserService: UserService) {}

  @Get('/profile')
  getUserProfile(@User() user: Partial<UserDocument>) {
    return this._UserService.getUserProfile(user);
  }

  @Patch('/profile')
  updateUserProfile(
    @Body() body: UpdateUserDto,
    @User('_id', ParseObjectIdPipe) userId: Types.ObjectId,
  ) {
    return this._UserService.updateUserProfile(body, userId);
  }

  @Roles(UserRoles.admin)
  @Get('/all_users')
  getAllUsers(@Query() query: GetUsersDto) {
    console.log(query);
    return this._UserService.getAllUsers(query);
  }
}
