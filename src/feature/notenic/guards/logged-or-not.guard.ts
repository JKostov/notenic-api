import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ITokenService } from '@notenic/auth/token/interfaces/token.service.interface';

@Injectable()
export class LoggedOrNotGuard implements CanActivate {
  constructor(@Inject('ITokenService') private readonly tokenService: ITokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (token) {
      request.user = await this.tokenService.verifyTokenAndGetData(token);
    }

    return true;
  }
}
