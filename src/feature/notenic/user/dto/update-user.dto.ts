import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '@notenic/user/user.entity';

export class UpdateUserDto {
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsString()
  @IsOptional()
  oldPassword: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  newPassword: string;

  @IsString()
  @IsIn([User.GenderMale, User.GenderFemale])
  gender: 'male' | 'female';

  @IsString()
  @IsOptional()
  work: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  image: string;
}
