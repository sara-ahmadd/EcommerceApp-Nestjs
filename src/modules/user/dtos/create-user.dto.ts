import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export enum UserRoles {
  admin = 'admin',
  vendor = 'vendor',
  customer = 'customer',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn([Math.random()], { message: 'Passwords mismatch!' })
  @ValidateIf((obj) => obj.password !== obj.confirmPassword)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role: string;
}
