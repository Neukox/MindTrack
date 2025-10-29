import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  private readonly logger = new Logger(JwtRefreshGuard.name);
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error(
        `Unauthorized access attempt: ${info?.message || err?.message}`,
      );
      throw err || new UnauthorizedException(err?.message || 'Acesso Negado');
    }
    
    this.logger.debug(`User ${user.id} authenticated successfully via refresh token.`);

    return user;
  }
}
