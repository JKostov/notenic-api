import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDto } from './token/dto/login.dto';
import { ITokenService } from './token/interfaces/token.service.interface';
import { RegisterDto } from './token/dto/register.dto';
import { VerifyRegistrationDto } from '@notenic/auth/token/dto/verify-registration.dto';
import { ForgotPasswordDto } from '@notenic/auth/token/dto/forgot-password.dto';
import { ResetPasswordDto } from '@notenic/auth/token/dto/reset-password.dto';

const loginFailedMessage = 'Invalid email address or password.';
const registrationSuccessfulMessage = 'Welcome.Please check your email to confirm registration.';
const emailVerificationSuccessfulMessage = 'Email successfully confirmed.';
const passwordResetEmailSentMessage = 'Password reset email successfully sent.';
const passwordResetSuccess = 'Password successfully changed.';

@Controller('auth')
export class AuthController {
  constructor(@Inject('ITokenService') private readonly tokenService: ITokenService) {
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto, @Res() res) {
    const loginSuccessDto = await this.tokenService.login(loginDto);

    if (!loginSuccessDto) {
      throw new HttpException(loginFailedMessage, HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json(loginSuccessDto);
  }

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto, @Res() res) {
    await this.tokenService.register(registerDto);
    res.status(HttpStatus.OK).json({ message: registrationSuccessfulMessage });
  }

  @Post('/forgot-password')
  public async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Res() res) {
    await this.tokenService.forgotPassword(forgotPasswordDto);
    res.status(HttpStatus.OK).json({ message: passwordResetEmailSentMessage });
  }

  @Post('/verify-email/')
  public async verifyToken(@Body() verifyRegistrationDto: VerifyRegistrationDto, @Res() res) {
    await this.tokenService.verifyRegistration(verifyRegistrationDto);
    res.status(HttpStatus.OK).json({ message: emailVerificationSuccessfulMessage });
  }

  @Post('/reset-password')
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res) {
    await this.tokenService.resetPassword(resetPasswordDto);
    res.status(HttpStatus.OK).json({ message: passwordResetSuccess });
  }
}
