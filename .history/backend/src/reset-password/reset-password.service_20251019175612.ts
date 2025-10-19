import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  async setTokenRecovery(userId: string, token: string, expiresAt: Date) {
    await this.prismaService.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findValidToken(token: string) {
    const now = new Date();

    return this.prismaService.passwordResetToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: now,
        },
      },
    });
  }

  async deleteTokens(userId: string) {
    await this.prismaService.passwordResetToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
