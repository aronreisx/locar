import { PrismaClient } from '@prisma/client';

export type IDatabaseClient = PrismaClient;
export const DatabaseClient = PrismaClient;
export const databaseClient = new DatabaseClient();
