import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error(
        `Unauthorized access attempt: ${info?.message || err?.message}`,
      );
      throw err || new UnauthorizedException(err?.message || 'Acesso Negado');
    }
    return user;
  }
}
