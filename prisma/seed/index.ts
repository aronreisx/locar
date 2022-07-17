import { PrismaClient } from '@prisma/client';

import { Cars } from './cars';
import { Categories } from './category';
import { Specifications } from './specifications';
import { Users } from './users';

const prisma = new PrismaClient();

async function Seed(prisma: PrismaClient): Promise<void> {
  await Categories(prisma);
  await Specifications(prisma);
  await Users(prisma);
  await Cars(prisma);
}

Seed(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
