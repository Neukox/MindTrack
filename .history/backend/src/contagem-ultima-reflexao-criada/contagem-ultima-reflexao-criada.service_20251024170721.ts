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
      return ultimoReflexaoCriadaa ? ultimoReflexaoCriadaa.createdAt : null;
    } catch (error) {
      console.error('Erro ao obter a última reflexão criada:', error);
      throw new Error('Erro ao obter a última reflexão criada');
    }
  }

  async contagemUltimaReflexaoCriadaPorUsuario(userId: string) {
    try {
      const ultimaReflexao = await prisma.reflection.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          category: true,
          emotion: true,
          createdAt: true,
        },
      });

      let tempoDesdeUltimaReflexao = 'Nunca';

      if (ultimaReflexao) {
        const agora = new Date();
        const diffMs = agora.getTime() - ultimaReflexao.createdAt.getTime();
        const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDias = Math.floor(diffHoras / 24);

        if (diffDias > 0) {
          tempoDesdeUltimaReflexao = `${diffDias} ${diffDias === 1 ? 'dia' : 'dias'} atrás`;
        } else if (diffHoras > 0) {
          tempoDesdeUltimaReflexao = `${diffHoras} ${diffHoras === 1 ? 'hora' : 'horas'} atrás`;
        } else {
          tempoDesdeUltimaReflexao = 'Menos de 1 hora atrás';
        }
      }

      return {
        success: true,
        data: {
          dataUltimaReflexao: ultimaReflexao?.createdAt?.toISOString() || null,
          tempoDesdeUltimaReflexao,
          reflexaoMaisRecente: ultimaReflexao
            ? {
                id: ultimaReflexao.id,
                title: ultimaReflexao.title,
                categoria: ultimaReflexao.category,
                emocao: ultimaReflexao.emotion,
                createdAt: ultimaReflexao.createdAt.toISOString(),
              }
            : null,
        },
      };
    } catch (error) {
      console.error('Erro ao obter última reflexão do usuário:', error);
      throw new Error('Erro ao obter última reflexão do usuário');
    }
  }
}
