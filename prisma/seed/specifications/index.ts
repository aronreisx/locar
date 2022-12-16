import { PrismaClient, Specification } from '@prisma/client';

import data from './data/specifications.json';

// HACK: To bypass strict Date type from Prisma
interface ISeedSpecification extends Omit<Specification, 'created_at'> {
  created_at: string | Date;
}

const specificationsData: ISeedSpecification[] = data;

async function Seed(prisma: PrismaClient) {
  const promises: Promise<ISeedSpecification>[] = [];
  console.log(`SPECIFICATIONS table seeding start...`);

  specificationsData.forEach((specification) => {
    promises.push(
      prisma.$queryRawUnsafe<Specification>(`
        INSERT INTO specifications (
          id,
          name,
          description,
          created_at
        ) VALUES (
          '${specification.id}',
          '${specification.name}',
          '${specification.description}',
          '${specification.created_at}'
        )
      `)
    );
  });

  const specificationsCreated = await Promise.all(promises);
  console.log(
    `${specificationsCreated.length} specifications successfully created`
  );
  console.log(`SPECIFICATIONS table seeding finished\n`);
}

export async function Specifications(prisma: PrismaClient): Promise<void> {
  await Seed(prisma);
}
