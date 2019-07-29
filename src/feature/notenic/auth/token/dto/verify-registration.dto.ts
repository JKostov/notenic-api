import { IsString } from 'class-validator';

export class VerifyRegistrationDto {
  @IsString()
  token: string;
}
