import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtTokenService } from '@notenic/jwt-token/jwt-token.service';

@Injectable()
export class LoggedOrNotGuard implements CanActivate {
  constructor(private readonly tokenService: JwtTokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (token) {
      request.user = await this.tokenService.verifyTokenAndGetData(token);
    }

    return true;
  }
}
