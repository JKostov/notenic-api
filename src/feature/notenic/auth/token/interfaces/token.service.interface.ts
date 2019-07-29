import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { LoginSuccessDto } from '../dto/login-success.dto';
import { VerifyRegistrationDto } from '@notenic/auth/token/dto/verify-registration.dto';
import { ForgotPasswordDto } from '@notenic/auth/token/dto/forgot-password.dto';
import { ResetPasswordDto } from '@notenic/auth/token/dto/reset-password.dto';

export interface ITokenService {
  login(userData: LoginDto): Promise<LoginSuccessDto>;

  register(userData: RegisterDto): Promise<any>;

  verifyRegistration(verifyRegistrationDto: VerifyRegistrationDto): Promise<void>;

  forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;

  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;

  // validateUser(payload: JwtPayload): Promise<any>;
}
