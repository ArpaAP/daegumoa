import { PrismaClient } from '@prisma/client';

const globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
