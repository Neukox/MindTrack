import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import CreateReflectionDto from './dtos/create-reflection.dto';
import { UserService } from '@/user/user.service';
import ReflectionFiltersDto from './dtos/reflection-flilters.dto';

@Injectable()
export class ReflexaoService {
  private readonly logger = new Logger(ReflexaoService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(
    reflection: CreateReflectionDto & { userId: string },
  ): Promise<void> {
    const { title, category, content, emotion, userId } = reflection;

    // Valida se o usuário existe
    const userExists = await this.userService.findOne(userId);

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const reflexaoCreated = await this.prismaService.reflection.create({
      data: {
        title,
        category: category,
        content,
        emotion: emotion,
        userId,
      },
    });

    this.logger.log(
      `Reflexão criada com ID: ${reflexaoCreated.id}`,
      reflexaoCreated,
    );
  }

  async findAllByUser(userId: string, filters: ReflectionFiltersDto) {
    const reflections = await this.prismaService.reflection.findMany({
      where: {
        userId,
        category: filters.category,
        emotion: filters.emotion,
        createdAt: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reflections;
  }

  async findOne(id: string) {
    const reflection = await this.prismaService.reflection.findUnique({
      where: { id },
    });

    return reflection;
  }

  async getFrequenciaSemanal(userId: string) {
    // Buscar reflexões dos últimos 7 dias agrupadas por dia
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const reflexoes = await this.prismaService.reflection.findMany({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Agrupar por dia da semana
    const frequenciaPorDia = [
      { dia: 'Dom', quantidade: 0 },
      { dia: 'Seg', quantidade: 0 },
      { dia: 'Ter', quantidade: 0 },
      { dia: 'Qua', quantidade: 0 },
      { dia: 'Qui', quantidade: 0 },
      { dia: 'Sex', quantidade: 0 },
      { dia: 'Sáb', quantidade: 0 },
    ];

    reflexoes.forEach((reflexao) => {
      const diaSemana = reflexao.createdAt.getDay();
      frequenciaPorDia[diaSemana].quantidade++;
    });

    // Formatar dados para o frontend
    const dataFormatada = frequenciaPorDia.map((item, index) => ({
      semana: item.dia,
      registros: item.quantidade,
      periodo: `Dia ${index + 1}`,
    }));

    const totalRegistros = reflexoes.length;
    const mediaRegistrosPorSemana = totalRegistros / 7;

    return {
      success: true,
      data: dataFormatada,
      meta: {
        totalRegistros,
        mediaRegistrosPorSemana: parseFloat(mediaRegistrosPorSemana.toFixed(2)),
      },
    };
  }

  async getCategoriasEstatisticas(userId: string) {
    const categorias = await this.prismaService.reflection.groupBy({
      by: ['category'],
      where: { userId },
      _count: {
        category: true,
      },
    });

    const totalRegistros = categorias.reduce((acc, cat) => acc + cat._count.category, 0);

    const dataFormatada = categorias.map((cat) => ({
      categoria: cat.category,
      quantidade: cat._count.category,
      percentual: parseFloat(((cat._count.category / totalRegistros) * 100).toFixed(2)),
    }));

    // Encontrar categoria mais frequente
    const categoriaMaisFrequente = dataFormatada.reduce(
      (prev, current) => (prev.quantidade > current.quantidade) ? prev : current,
      dataFormatada[0]
    );

    return {
      success: true,
      data: dataFormatada,
      meta: {
        totalRegistros,
        categoriaMaisFrequente: categoriaMaisFrequente?.categoria || 'Nenhuma',
      },
    };
  }

  async getEmocoesEstatisticas(userId: string) {
    const emocoes = await this.prismaService.reflection.groupBy({
      by: ['emotion'],
      where: { userId },
      _count: {
        emotion: true,
      },
    });

    const totalRegistros = emocoes.reduce((acc, emo) => acc + emo._count.emotion, 0);

    const dataFormatada = emocoes.map((emo) => ({
      emocao: emo.emotion,
      quantidade: emo._count.emotion,
      percentual: parseFloat(((emo._count.emotion / totalRegistros) * 100).toFixed(2)),
    }));

    // Encontrar emoção mais frequente
    const emocaoMaisFrequente = dataFormatada.reduce(
      (prev, current) => (prev.quantidade > current.quantidade) ? prev : current,
      dataFormatada[0]
    );

    return {
      success: true,
      data: dataFormatada,
      meta: {
        totalRegistros,
        emocaoMaisFrequente: emocaoMaisFrequente?.emocao || 'Nenhuma',
      },
    };
  }
}
