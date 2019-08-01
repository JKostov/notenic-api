import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TokenService } from '@notenic/auth/token/token.service';
import { MailerService } from '@nest-modules/mailer';
import { UserService } from '@notenic/user/user.service';
import { PasswordResetService } from '@notenic/auth/password-reset.service';
import { PasswordReset } from '@notenic/auth/password-reset.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { User } from '@notenic/user/user.entity';
import { SharedModule } from '@app/shared/shared.module';
import { TokenFactory } from '@notenic/auth/token/token.factory';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [SharedModule],
          useClass: TokenFactory,
        }),
      ],
      controllers: [AuthController],
      providers: [
        { provide: 'ITokenService', useClass: TokenService },
        { provide: MailerService, useValue: {} },
        { provide: 'IConfigService', useValue: {} },
        { provide: getRepositoryToken(User, DatabaseFactory.connectionName), useValue: {} },
        { provide: 'IUserService', useClass: UserService },
        { provide: getRepositoryToken(PasswordReset, DatabaseFactory.connectionName), useValue: {} },
        { provide: 'IPasswordResetService', useClass: PasswordResetService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
