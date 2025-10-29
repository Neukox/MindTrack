import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '@/user/user.service';
import HashingService from '@/auth/hashing/hashing.service';
import TokenPayloadDto from '../dto/token-payload.dto';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private logger = new Logger(JwtRefreshStrategy.name);
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['refresh_token'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayloadDto) {
    const refreshToken = req.cookies['refresh_token'];

    const user = await this.userService.findOne(payload.sub);

    this.logger.debug(`Validating refresh token for user ID: ${payload.sub}`);

    if (!user || !user.refreshToken) {
      this.logger.warn(
        `No user or refresh token found for user ID ${payload.sub}`,
      );
      throw new UnauthorizedException('Acesso Negado');
    }

    const isRefreshTokenMatching = await this.hashingService.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatching) {
      this.logger.warn(`Refresh token mismatch for user ID ${payload.sub}`);
      throw new UnauthorizedException('Acesso Negado');
    }

    this.logger.debug(
      `Refresh token match status for user ID ${payload.sub}: ${isRefreshTokenMatching}`,
    );

    return {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
