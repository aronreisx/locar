import { PrismaClient } from '@prisma/client';

export type IDatabaseClient = PrismaClient;
export const databaseClient = new PrismaClient();
