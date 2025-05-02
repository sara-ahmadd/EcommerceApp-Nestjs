import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { otpTypes, UserDocument } from '../../DB/models/user.model';
import { decrypt } from '../../utils/encryptText';
import { emailVerificationTemplate } from '../../utils/emails/emailVerification';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { FilterQuery, Types } from 'mongoose';
import { GetUsersDto } from './dtos/get-users.dto';

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

  async getUser({ filter }: { filter: Partial<UserDocument> }) {
    const user = this._UserRepo.findOne({
      filter: filter as FilterQuery<UserDocument>,
    });
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

  async updateUserProfile(body: Partial<UserDocument>, userId: Types.ObjectId) {
    const { name, phone, address, email } = body;
    const user = await this._UserRepo.findOne({ filter: { _id: userId } });
    if (!user) throw new NotFoundException('user is not found');
    if (!user.isVerified) throw new BadRequestException('user is not verified');

    user.name = name ?? user.name;
    user.address = address ?? user.address;
    user.phone = phone ?? user.phone;
    user.email = email ?? user.email;
    await user.save();
    const updatedUser = await this._UserRepo.findOne({
      filter: { _id: userId },
    });
    return {
      message: 'User is updated successfully',
      user: {
        name: updatedUser?.name,
        address: updatedUser?.address,
        email: updatedUser?.email,
        phone: decrypt({ cypherText: updatedUser?.phone }),
      },
    };
  }
  async getAllUsers(query: GetUsersDto) {
    const users = await this._UserRepo.findAll({
      filter: {},
      page: query.page ?? 1,
    });
    return { message: 'users fetched successfully', ...users };
  }
}
