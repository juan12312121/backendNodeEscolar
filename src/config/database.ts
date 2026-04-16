import { PrismaClient } from '@prisma/client';

const isProduction = process.env.DB_MODE === 'production';

const DATABASE_URL = isProduction
    ? `mysql://${process.env.DB_USER_PROD}:${process.env.DB_PASSWORD_PROD}@${process.env.DB_HOST_PROD}:${process.env.DB_PORT_PROD}/${process.env.DB_NAME_PROD}`
    : `mysql://${process.env.DB_USER_LOCAL}:${process.env.DB_PASSWORD_LOCAL}@${process.env.DB_HOST_LOCAL}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME_LOCAL}`;

process.env.DATABASE_URL = DATABASE_URL;

// Singleton: en desarrollo evita multiples instancias por recarga de modulos.
// En produccion Node.js cachea el modulo y garantiza una sola instancia.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma: PrismaClient =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
