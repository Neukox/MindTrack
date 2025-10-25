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
