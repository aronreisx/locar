import { PrismaClient } from '@prisma/client';

export type IDatabaseClient = PrismaClient;
export const databaseClient = new PrismaClient();
// {
//   log: [
//     {
//       emit: 'stdout',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// }
