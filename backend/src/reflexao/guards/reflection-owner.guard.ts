import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReflexaoService } from '../reflexao.service';
import { Request } from 'express';

@Injectable()
export default class ReflectionOwnerGuard implements CanActivate {
  constructor(private readonly reflectionService: ReflexaoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest();
    const payload = request.user as any;
    const userId = payload.sub;
    const reflectionId = request.params.id;

    const reflection = await this.reflectionService.findOne(reflectionId);

    if (!reflection) {
      throw new NotFoundException('Reflexão não encontrada.');
    }

    if (reflection.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta reflexão.',
      );
    }

    return true;
  }
}
