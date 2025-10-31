import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  private readonly logger = new Logger(JwtRefreshGuard.name);
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Log apenas em modo debug para evitar spam no console
      this.logger.debug(
        `JWT Refresh failed: ${info?.message || err?.message || 'No token provided'}`,
      );
      throw err || new UnauthorizedException(err?.message || 'Acesso Negado');
    }
    
    this.logger.debug(`User ${user.id} authenticated successfully via refresh token.`);

    return user;
  }
}
