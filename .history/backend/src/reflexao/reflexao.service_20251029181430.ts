import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import CreateReflectionDto from './dtos/create-reflection.dto';
import { UserService } from '@/user/user.service';
import ReflectionFiltersDto from './dtos/reflection-flilters.dto';
import UpdateReflectionDto from './dtos/update-reflection.dto';

@Injectable()
export class ReflexaoService {
  private readonly logger = new Logger(ReflexaoService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(reflection: CreateReflectionDto, userId: string): Promise<void> {
    const { title, category, content, emotion } = reflection;

    this.logger.log(
      `Criando reflexão para o usuário ID: ${userId}`,
      reflection,
    );

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
    // Construir o objeto where dinamicamente
    const whereClause: any = {
      userId,
    };

    // Adicionar filtros opcionais apenas se existirem
    if (filters.category) {
      whereClause.category = filters.category;
    }
    
    if (filters.emotion) {
      whereClause.emotion = filters.emotion;
    }

    // Processar filtros de data se existirem
    if (filters.startDate || filters.endDate) {
      whereClause.createdAt = {};
      
      if (filters.startDate) {
        try {
          // Garantir que temos uma string de data válida
          let dateString: string;
          if (filters.startDate instanceof Date) {
            dateString = filters.startDate.toISOString().split('T')[0];
          } else {
            dateString = String(filters.startDate);
          }
          
          // Criar data de início do dia em UTC
          const startDate = new Date(dateString + 'T00:00:00.000Z');
          if (!isNaN(startDate.getTime())) {
            whereClause.createdAt.gte = startDate;
          }
        } catch (error) {
          console.error('Erro ao processar startDate:', error);
        }
      }
      
      if (filters.endDate) {
        try {
          // Garantir que temos uma string de data válida
          let dateString: string;
          if (filters.endDate instanceof Date) {
            dateString = filters.endDate.toISOString().split('T')[0];
          } else {
            dateString = String(filters.endDate);
          }
          
          // Criar data de final do dia em UTC
          const endDate = new Date(dateString + 'T23:59:59.999Z');
          if (!isNaN(endDate.getTime())) {
            whereClause.createdAt.lte = endDate;
          }
        } catch (error) {
          console.error('Erro ao processar endDate:', error);
        }
      }
    }

    console.log('🔍 Filtros aplicados (corrigido v2):', {
      userId,
      filters: {
        ...filters,
        startDate: filters.startDate ? {
          original: filters.startDate,
          type: typeof filters.startDate,
          isDate: filters.startDate instanceof Date
        } : null,
        endDate: filters.endDate ? {
          original: filters.endDate,
          type: typeof filters.endDate,
          isDate: filters.endDate instanceof Date
        } : null
      },
      whereClause: JSON.stringify(whereClause, null, 2)
    });

    const reflections = await this.prismaService.reflection.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`✅ Encontrados ${reflections.length} registros para o usuário ${userId}`);
    
    return reflections;
  }

  async findOne(id: string) {
    const reflection = await this.prismaService.reflection.findUnique({
      where: { id },
    });

    return reflection;
  }

  async getLastReflectionCreatedByUser(userId: string) {
    const reflection = await this.prismaService.reflection.findFirst({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reflection;
  }

  async update(id: string, updateReflectionDto: UpdateReflectionDto) {
    const { title, category, content, emotion } = updateReflectionDto;

    const reflection = await this.prismaService.reflection.update({
      where: { id },
      data: {
        title,
        category,
        content,
        emotion,
      },
    });

    this.logger.log(`Reflexão atualizada com ID: ${reflection.id}`, reflection);

    return reflection;
  }

  async delete(id: string) {
    const reflection = await this.prismaService.reflection.delete({
      where: { id },
    });

    this.logger.log(`Reflexão deletada com ID: ${reflection.id}`, reflection);

    return reflection;
  }
}
