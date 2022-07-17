import { PrismaClient, Category } from '@prisma/client';

import data from './data/categories.json';

// HACK: To bypass strict Date type from Prisma
interface ISeedCategory extends Omit<Category, 'created_at'> {
  created_at: string | Date;
}

const categoriesData: ISeedCategory[] = data;

async function Seed(prisma: PrismaClient) {
  const promises: Promise<ISeedCategory>[] = [];
  console.log(`CATEGORIES table seeding start...`);

  categoriesData.forEach((category) => {
    promises.push(
      prisma.$queryRawUnsafe<Category>(`
        INSERT INTO categories (
          id,
          name,
          description,
          created_at
        ) VALUES (
          '${category.id}',
          '${category.name}',
          '${category.description}',
          '${category.created_at}'
        )
      `)
    );
  });

  const categoriesCreated = await Promise.all(promises);
  console.log(`${categoriesCreated.length} categories successfully created`);
  console.log(`CATEGORIES table seeding finished\n`);
}

export async function Categories(prisma: PrismaClient): Promise<void> {
  await Seed(prisma);
}
