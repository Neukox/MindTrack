import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';
@Injectable()
export class ContagemUltimaReflexaoCriadaService {

    //Algoritmo para calcular a contagem desde a última reflexão criada.

    async contagemUltimaReflexaoCriada(): Promise<number>{}
}
