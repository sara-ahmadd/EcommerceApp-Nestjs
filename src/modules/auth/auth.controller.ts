import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './../../common/decorators/public.decorator';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private _AuthService: AuthService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this._AuthService.register(body);
  }

  @Post('/verify_email')
  verifyEmail(@Body() body: VerifyEmailDto) {
    return this._AuthService.verifyEmail(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this._AuthService.login(body);
  }

  @Post('/forgot_password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this._AuthService.forgotPassword(body);
  }

  @Post('/reset_password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this._AuthService.resetPassword(body);
  }

  @Post('/new-access_token')
  generateOtp(@Body('refreshToken') refreshToken: string) {
    return this._AuthService.generateAccessToken(refreshToken);
  }
}
