//schema class

import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../../modules/user/dtos/create-user.dto';
import { encryptText } from './../../utils/encryptText';
import { hashText } from './../../utils/hashText';

export enum otpTypes {
  confirmEmail = 'confirmEmail',
  forgetPassword = 'forgetPassword',
}

@Schema({ timestamps: true, expireAfterSeconds: 1000 })
export class Otp {
  @Prop({
    type: String,
    enum: [otpTypes.confirmEmail, otpTypes.forgetPassword],
    required: true,
  })
  otpType: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: Date })
  expiresIn: string;
}

//create otp schema
const OtpSchema = SchemaFactory.createForClass(Otp);

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, default: UserRoles.customer })
  role: string;
  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Date })
  changeCredentialsTime: string;

  @Prop([{ type: OtpSchema }])
  otp: { otpType: otpTypes; code: string; expiresIn: string }[];

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
}

//schema
export const UserSchema = SchemaFactory.createForClass(User);

//hash password before creating new user document
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashText(this.password);
  }
  if (this.isModified('phone')) {
    this.phone = encryptText(this.phone);
  }
  return next();
});

export const UserModelName = User.name;
//model
export const UserModel = MongooseModule.forFeature([
  { name: UserModelName, schema: UserSchema },
]);

//user doc
export type UserDocument = HydratedDocument<User>;
