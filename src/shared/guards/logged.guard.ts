import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Token } from '../../feature/notenic/auth/token/interfaces/token.interface';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private readonly tokenService: JwtTokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    const tokenData: Token = await this.tokenService.verifyTokenAndGetData(token);

    if (tokenData) {
      request.user = tokenData;
      return true;
    }

    return false;
  }
}
