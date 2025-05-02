import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { otpTypes } from '../../DB/models/user.model';
import { resetPasswordTemplate } from '../../utils/emails/resetPassword';
import { compareHash, hashText } from '../../utils/hashText';
import { generateToken, verifyToken } from '../../utils/token';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dtos/auth.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    private _UserService: UserService,
    private _UserRepo: UserRepository,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}
  register(body: CreateUserDto) {
    return this._UserService.createUser(body);
  }

  async verifyEmail(body: VerifyEmailDto) {
    const user = await this._UserRepo.findOne({
      filter: { email: body.email },
    });
    if (!user) throw new BadRequestException('user is not found');
    const emailOtp = user.otp.find(
      (item) => item.otpType === otpTypes.confirmEmail,
    );
    if (body.otp !== emailOtp?.code)
      throw new BadRequestException('otp is invalid');

    user.isVerified = true;
    await user.save();
    return {
      status: 'success',
      message: 'email is verified successfully',
    };
  }

  async login(body: LoginDto) {
    const user = await this._UserService.getUser({
      filter: { email: body.email },
    });
    if (!user) throw new BadRequestException('user is not found');
    if (!user.isVerified) throw new BadRequestException('user is not verified');

    const comparePasswords = compareHash(body.password, user.password);
    if (!comparePasswords) throw new BadRequestException('invalid credentials');
    const accessToken = generateToken(
      { id: user._id },
      this.configService.get('ACCESS_EXPIRY_TIME')!,
    );
    const refreshToken = generateToken(
      { id: user._id },
      this.configService.get('REFRESH_EXPIRY_TIME')!,
    );

    return {
      status: 'success',
      message: 'logged in successfully',
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const user = await this._UserRepo.findOne({
      filter: { email: body.email },
    });
    if (!user) throw new BadRequestException('user is not found');
    if (!user.isVerified) throw new BadRequestException('user is not verified');

    const otp = this._UserService.createOtp();

    this.mailerService.sendMail({
      to: user.email,
      subject: 'Ecommerce app',
      text: 'Reset your password',
      html: resetPasswordTemplate(otp),
    });
    user.otp.push({
      otpType: otpTypes.forgetPassword,
      code: otp,
      expiresIn: `${new Date().getTime() + 10 * 60 * 1000}`,
    });
    await user.save();
    return {
      status: 'success',
      message: 'otp sent to your email to reset your password',
    };
  }

  async resetPassword(body: ResetPasswordDto) {
    const user = await this._UserRepo.findOne({
      filter: { email: body.email },
    });
    if (!user) throw new BadRequestException('user is not found');

    if (!user.isVerified) throw new BadRequestException('user is not verified');

    const passwordOtp = user.otp.find(
      (item) => item.otpType === otpTypes.forgetPassword,
    );
    if (body.otp !== passwordOtp?.code)
      throw new BadRequestException('otp is invalid');

    await this._UserRepo.updateOne({
      filter: { email: body.email },
      updatedFields: {
        password: hashText(body.password),
        changeCredentialsTime: new Date().getTime(),
      },
    });
    return {
      status: 'success',
      message: 'password is updated successfully',
    };
  }

  async generateAccessToken(refreshToken: string) {
    const payload = verifyToken(refreshToken);
    const user = await this._UserService.getUser({
      filter: { _id: payload.id },
    });
    if (!user) throw new BadRequestException('user is not found');
    if (!user.isVerified) throw new BadRequestException('user is not verified');
    const accessToken = generateToken(
      { id: user._id },
      this.configService.get('ACCESS_EXPIRY_TIME')!,
    );
    return { accessToken };
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async removeExpiredOtps() {
    const currentTime = new Date();

    await this._UserRepo.updateManyUsers({
      filter: {
        'otp.expiresIn': { $lt: currentTime },
      },
      updatedFields: { $pull: { otp: { expiresIn: { $lt: currentTime } } } },
    });
  }
}
