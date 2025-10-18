import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
import { Category } from '../../generated/prisma/index';
@Injectable()
export class ReflexaoService {
  //Algoritmo de criação de reflexao.

  const {title, category, content, emotion} = payload;

  async createReflexao()
}
