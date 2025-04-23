import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from './user.repository';
import { otpTypes, UserDocument } from 'src/DB/models/user.model';
import { MailerService } from '@nestjs-modules/mailer';
import * as otpGenerator from 'otp-generator';
import { emailVerificationTemplate } from 'src/utils/emails/emailVerification';
import { Types } from 'mongoose';
import { verifyToken } from 'src/utils/token';
import { decrypt } from 'src/utils/encryptText';

@Injectable()
export class UserService {
  constructor(
    private _UserRepo: UserRepository,
    private mailerService: MailerService,
  ) {}

  createOtp() {
    // Generate OTP of length 5-15
    const otpLength = Math.floor(Math.random() * 10) + 5;
    const otp = otpGenerator.generate(otpLength, {
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      digits: true,
    });
    return otp;
  }

  async createUser(user: CreateUserDto) {
    try {
      const otp = this.createOtp();
      const newUser = await this._UserRepo.create({
        data: {
          ...user,
          otp: [
            {
              otpType: otpTypes.confirmEmail,
              code: otp,
              expiresIn: `${new Date().getTime() + 5 * 60 * 1000}`,
            },
          ],
        },
      });
      this.mailerService.sendMail({
        to: user.email,
        subject: 'Ecommerce app',
        text: 'Activate your account',
        html: emailVerificationTemplate(otp),
      });

      return {
        status: 'Success',
        message: 'User created successfully',
        newUser,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUer({ filter }: { filter: Partial<UserDocument> }) {
    const user = this._UserRepo.findOne({ filter });
    if (!user) throw new NotFoundException('user is not found');
    return user;
  }
  async getUserProfile(user: Partial<UserDocument>) {
    try {
      if (!user.isVerified)
        throw new BadRequestException('user is not verified');
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: decrypt({ cypherText: user.phone }),
        },
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
