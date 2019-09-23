import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Token } from '@notenic/auth/token/interfaces/token.interface';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) { }

  sign(payload: string | Buffer | object, options?: jwt.SignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  signAsync(payload: string | Buffer | object, options?: jwt.SignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  verify<T extends object = any>(token: string, options?: jwt.VerifyOptions): T {
    return this.jwtService.verify<T>(token, options);
  }

  verifyAsync<T extends object = any>(token: string, options?: jwt.VerifyOptions): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, options);
  }

  decode(token: string, options?: jwt.DecodeOptions): null | {
    [key: string]: any;
  } | string {
    return this.jwtService.decode(token, options);
  }

  async verifyTokenAndGetData(token: string): Promise<Token> {
    let data = null;
    try {
      data = await this.jwtService.verifyAsync(token);
    } catch (e) {
      return null;
    }

    return data;
  }
}
