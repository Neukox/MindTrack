import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';

@Injectable()
export class ContagemTotalRegistrosService {
  //Algoritmo para calcular o total de registros criados.

  async contarTotalRegistros(): Promise<number> {
    // Contar o total de registros na tabela "registros"
    const totalRegistros = await prisma.reflection.count();
    return totalRegistros;
  }
}
