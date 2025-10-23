import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
import { type ConfigType } from '@nestjs/config';
@Injectable()


export class ContagemUltimaReflexaoCriadaService {
  //Algoritmo para calcular a contagem desde a última reflexão criada.

  async contagemUltimaReflexaoCriada(): Promise<Date | null> {
    try {
        const ultimoReflexaoCriadaa = await prisma.reflection.findFirst({
          orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console
    }
    return ultimoReflexaoCriadaa ? ultimoReflexaoCriadaa.createdAt : null;
  }
}
