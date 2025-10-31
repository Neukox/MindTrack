import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Log apenas em modo debug para evitar spam no console durante refresh automático
      this.logger.debug(
        `JWT Auth failed: ${info?.message || err?.message || 'No token provided'}`,
      );
      throw err || new UnauthorizedException(err?.message || 'Acesso Negado');
    }
    return user;
  }
}
