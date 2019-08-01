import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '@app/shared/config/config.service';
import { UserService } from '@notenic/user/user.service';
import { PasswordResetService } from '@notenic/auth/password-reset.service';
import { SharedModule } from '@app/shared/shared.module';
import { TokenFactory } from '@notenic/auth/token/token.factory';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '@notenic/user/user.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PasswordReset } from '@notenic/auth/password-reset.entity';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [SharedModule],
          useClass: TokenFactory,
        }),
      ],
      providers: [
        TokenService,
        { provide: MailerService, useValue: {} },
        { provide: 'IConfigService', useValue: {} },
        { provide: getRepositoryToken(User, DatabaseFactory.connectionName), useValue: {} },
        { provide: 'IUserService', useClass: UserService },
        { provide: getRepositoryToken(PasswordReset, DatabaseFactory.connectionName), useValue: {} },
        { provide: 'IPasswordResetService', useClass: PasswordResetService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
