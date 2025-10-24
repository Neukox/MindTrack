import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import RegisterDto from '@/auth/dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(registerDto: RegisterDto) {
    return this.prismaService.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: registerDto.password,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      message: 'Perfil atualizado com sucesso',
      user: updatedUser,
    };
  }

  async changePasswordWithValidation(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

    // Verificar se nova senha e confirmação coincidem
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Nova senha e confirmação não coincidem');
    }

    // Buscar usuário
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Senha atual incorreta');
    }

    // Hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  async changePassword(id: string, newPassword: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }

  async setRefreshToken(id: string, refreshToken: string | null) {
    return this.prismaService.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
