import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '@notenic/user/user.entity';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @MaxLength(50)
  readonly lastName: string;

  @IsString()
  @MaxLength(30)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @IsIn([User.GenderMale, User.GenderFemale])
  readonly gender: 'male' | 'female';
}
