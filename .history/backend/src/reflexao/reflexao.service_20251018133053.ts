import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
import { Category } from '../../generated/prisma/index';
import { type } from 'os';

type ReflexaoPayload = {
  title: string;
  category: Category;
  content: string;
  emotion: string;
};
@Injectable()
export class ReflexaoService {
  //Algoritmo de criação de reflexao.

  const {title, category, content, emotion} = payload;

  async createReflexao(payload: ReflexaoPayload))
}
