import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import RegisterDto from '@/auth/dto/register.dto';

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

  async changePassword(id: string, newPassword: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
