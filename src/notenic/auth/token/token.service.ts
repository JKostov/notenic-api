import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITokenService } from './interfaces/token.service.interface';
import { IUserService } from '../../user/user.service.interface';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { plainToClass } from 'class-transformer';
import { MailerService } from '@nest-modules/mailer';
import { LoginSuccessDto } from './dto/login-success.dto';
import { VerifyRegistrationDto } from '@notenic/auth/token/dto/verify-registration.dto';
import { ForgotPasswordDto } from '@notenic/auth/token/dto/forgot-password.dto';
import { IPasswordResetService } from '@notenic/auth/password-reset.service.interface';
import { ResetPasswordDto } from '@notenic/auth/token/dto/reset-password.dto';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';
import { User } from '@notenic/user/user.entity';
import { JwtTokenService } from '@app/shared/jwt-token/jwt-token.service';
import { Token } from '@app/shared/jwt-token/token.interface';

const tokenExpiredMessage = 'Email verification expired. Register again.';
const tokenInvalidMessage = 'Email verification invalid.';
const invalidEmailMessage = 'Email invalid.';

@Injectable()
export class TokenService implements ITokenService {
  private static readonly saltRounds = 10;

  constructor(
    private readonly jwtService: JwtTokenService,
    private readonly mailerService: MailerService,
    @Inject('IConfigService') private readonly configService: IConfigService,
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IPasswordResetService') private readonly passwordResetService: IPasswordResetService,
  ) {}

  async login(userData: LoginDto): Promise<LoginSuccessDto> {
    const user = await this.userService.getOneByEmailComplete(userData.email);

    if (!user) {
      return null;
    }

    const result = await TokenService.compareHash(userData.password, user.password);

    if (!result) {
      return null;
    }

    if (!user.enabled) {
      throw new HttpException('Please confirm your email address.', HttpStatus.BAD_REQUEST);
    }

    delete user.password;

    const tokenData: Token = { id: user.id, email: user.email, username: user.username };

    const token = await this.jwtService.signAsync(tokenData);

    return { user, token };
  }

  async register(userData: RegisterDto): Promise<User> {

    const user = plainToClass(User, userData);

    user.password = await TokenService.generateHash(user.password);
    user.registrationToken = this.jwtService.sign({ email: user.email }, { expiresIn: '365 days' });

    const newUser = await this.userService.create(user);

    const domain = this.configService.get('APP_DOMAIN');
    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Welcome to Notenic',
      template: 'register',
      context: {
        email: newUser.email,
        token: newUser.registrationToken,
        domain,
      },
    });

    return newUser;
  }

  async verifyRegistration(verifyRegistrationDto: VerifyRegistrationDto): Promise<void> {
    const token = verifyRegistrationDto.token;

    let result = null;
    try {
      result = await this.jwtService.verifyAsync(token, { ignoreExpiration: true });
    } catch (e) {
      throw new HttpException(tokenInvalidMessage, HttpStatus.BAD_REQUEST);
    }

    if (Date.now() / 1000 < result.exp) {
      await this.userService.verifyRegistrationByEmail(result.email);
    } else {
      await this.userService.deleteByEmail(result.email);
      throw new HttpException(tokenExpiredMessage, HttpStatus.BAD_REQUEST);
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.getOneByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new HttpException(invalidEmailMessage, HttpStatus.BAD_REQUEST);
    }

    const pr = await this.passwordResetService.clearExistingAndCreateNewForUser(user);

    const domain = this.configService.get('APP_DOMAIN');
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: 'password-reset',
      context: {
        email: user.email,
        token: pr.id,
        domain,
      },
    });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.userService.getOneByEmail(resetPasswordDto.email);

    if (!user) {
      throw new HttpException(invalidEmailMessage, HttpStatus.BAD_REQUEST);
    }

    const passwordReset = await this.passwordResetService.deleteByIdAndUser(resetPasswordDto.token, user);

    if (!passwordReset) {
      throw new HttpException(invalidEmailMessage, HttpStatus.BAD_REQUEST);
    }

    const newPassword = await TokenService.generateHash(resetPasswordDto.password);
    await this.userService.updatePassword(user, newPassword);
  }

  static async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, TokenService.saltRounds);
  }

  async verifyTokenAndGetData(token: string): Promise<Token> {
    return this.jwtService.verifyTokenAndGetData(token);
  }
}
