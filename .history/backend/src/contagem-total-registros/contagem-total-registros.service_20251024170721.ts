import { Injectable } from '@nestjs/common';
import prisma from '@/lib/prisma.client';

@Injectable()
export class ContagemTotalRegistrosService {
  //Algoritmo para calcular o total de registros criados.

  async contarTotalRegistros(): Promise<number> {
    try {
      // Contar o total de registros na tabela "reflections"
      const totalRegistros = await prisma.reflection.count();
      return totalRegistros;
    } catch (error) {
      console.error('Erro ao contar total de registros:', error);
      throw new Error('Erro ao contar total de registros');
    }
  }

  async contarTotalRegistrosPorUsuario(userId: string) {
    try {
      // Contar o total de registros do usuário
      const totalEntradas = await prisma.reflection.count({
        where: { userId },
      });

      // Calcular início e fim do semestre atual (aproximadamente 6 meses)
      const agora = new Date();
      const inicioSemestre = new Date(
        agora.getFullYear(),
        agora.getMonth() - 5,
        1,
      );

      // Contar registros deste semestre
      const entradasEsseSemestre = await prisma.reflection.count({
        where: {
          userId,
          createdAt: {
            gte: inicioSemestre,
          },
        },
      });

      // Calcular crescimento (semestre anterior vs atual)
      const inicioSemestreAnterior = new Date(inicioSemestre);
      inicioSemestreAnterior.setMonth(inicioSemestreAnterior.getMonth() - 6);

      const entradasSemestreAnterior = await prisma.reflection.count({
        where: {
          userId,
          createdAt: {
            gte: inicioSemestreAnterior,
            lt: inicioSemestre,
          },
        },
      });

      const crescimentoPercentual =
        entradasSemestreAnterior === 0
          ? 100
          : Math.round(
              ((entradasEsseSemestre - entradasSemestreAnterior) /
                entradasSemestreAnterior) *
                100,
            );

      // Buscar última entrada
      const ultimaEntrada = await prisma.reflection.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      });

      return {
        success: true,
        data: {
          totalEntradas,
          entradasEsseSemestre,
          crescimentoPercentual,
          ultimaEntrada: ultimaEntrada?.createdAt?.toISOString() || null,
        },
        meta: {
          semestreInicio: inicioSemestre.toISOString(),
          semestreFim: agora.toISOString(),
        },
      };
    } catch (error) {
      console.error('Erro ao contar registros por usuário:', error);
      throw new Error('Erro ao contar registros por usuário');
    }
  }
}
