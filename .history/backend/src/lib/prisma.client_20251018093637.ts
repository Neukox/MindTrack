import { PrismaClient } from '@prisma/client';

// Declaração global para evitar múltiplas instâncias durante desenvolvimento
declare global {
  var __prisma: PrismaClient | undefined;
}

// Usar instância global em desenvolvimento para evitar múltiplas conexões
const prisma = global.__prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.__prisma = prisma;
}

export default prisma;
