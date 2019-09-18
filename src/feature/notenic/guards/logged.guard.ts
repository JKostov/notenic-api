import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ITokenService } from '@notenic/auth/token/interfaces/token.service.interface';
import { Token } from '@notenic/auth/token/interfaces/token.interface';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(@Inject('ITokenService') private readonly tokenService: ITokenService) { }

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
