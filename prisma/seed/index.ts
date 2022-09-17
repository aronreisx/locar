import { PrismaClient } from '@prisma/client';

import { Cars } from './cars';
import { Categories } from './category';
import { Specifications } from './specifications';
import { Users } from './users';

async function Seed(databaseClient: PrismaClient): Promise<void> {
  try {
    await Categories(databaseClient);
    await Specifications(databaseClient);
    await Users(databaseClient);
    await Cars(databaseClient);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await databaseClient.$disconnect();
  }
}

const clientConnection = new PrismaClient();

Seed(clientConnection);
