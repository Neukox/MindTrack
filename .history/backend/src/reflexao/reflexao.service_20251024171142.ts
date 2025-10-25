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
    // Calcular início e fim da semana atual (domingo a sábado)
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay()); // Volta para o domingo
    inicioSemana.setHours(0, 0, 0, 0);

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6); // Vai até sábado
    fimSemana.setHours(23, 59, 59, 999);

    const reflexoes = await this.prismaService.reflection.findMany({
      where: {
        userId,
        createdAt: {
          gte: inicioSemana,
          lte: fimSemana,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Agrupar por dia da semana (0=Dom, 1=Seg, ..., 6=Sáb)
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
      const diaSemana = reflexao.createdAt.getDay(); // 0=Dom, 1=Seg, etc.
      frequenciaPorDia[diaSemana].quantidade++;
    });

    // Formatar dados para o frontend
    const dataFormatada = frequenciaPorDia.map((item) => ({
      semana: item.dia,
      registros: item.quantidade,
      periodo: item.dia,
    }));

    const totalRegistros = reflexoes.length;
    const diasDecorridos = Math.min(hoje.getDay() + 1, 7); // Quantos dias da semana já passaram
    const mediaRegistrosPorDia =
      diasDecorridos > 0 ? totalRegistros / diasDecorridos : 0;

    return {
      success: true,
      data: dataFormatada,
      meta: {
        totalRegistros,
        mediaRegistrosPorSemana: parseFloat(mediaRegistrosPorDia.toFixed(2)),
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

    const totalRegistros = categorias.reduce(
      (acc, cat) => acc + cat._count.category,
      0,
    );

    if (totalRegistros === 0) {
      return {
        success: true,
        data: [],
        meta: {
          totalRegistros: 0,
          categoriaMaisFrequente: 'Nenhuma',
        },
      };
    }

    const dataFormatada = categorias.map((cat) => ({
      categoria: cat.category,
      quantidade: cat._count.category,
      percentual: parseFloat(
        ((cat._count.category / totalRegistros) * 100).toFixed(2),
      ),
    }));

    // Encontrar categoria mais frequente
    const categoriaMaisFrequente = dataFormatada.reduce(
      (prev, current) =>
        prev.quantidade > current.quantidade ? prev : current,
      dataFormatada[0],
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

    const totalRegistros = emocoes.reduce(
      (acc, emo) => acc + emo._count.emotion,
      0,
    );

    if (totalRegistros === 0) {
      return {
        success: true,
        data: [],
        meta: {
          totalRegistros: 0,
          emocaoMaisFrequente: 'Nenhuma',
        },
      };
    }

    const dataFormatada = emocoes.map((emo) => ({
      emocao: emo.emotion,
      quantidade: emo._count.emotion,
      percentual: parseFloat(
        ((emo._count.emotion / totalRegistros) * 100).toFixed(2),
      ),
    }));

    // Encontrar emoção mais frequente
    const emocaoMaisFrequente = dataFormatada.reduce(
      (prev, current) =>
        prev.quantidade > current.quantidade ? prev : current,
      dataFormatada[0],
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
