import { PrismaClient, Car } from '@prisma/client';

import data from './data/cars.json';

// HACK: To bypass strict Date type from Prisma
interface ISeedCar extends Omit<Car, 'created_at'> {
  created_at: string | Date;
}

const carsData: ISeedCar[] = data;

async function Seed(prisma: PrismaClient) {
  const promises: Promise<ISeedCar>[] = [];
  console.log(`CARS table seeding start...`);

  carsData.forEach((cars) => {
    promises.push(
      prisma.$queryRawUnsafe<Car>(`
        INSERT INTO cars (
          id,
          name,
          description,
          daily_rate,
          available,
          license_plate,
          fine_amount,
          brand,
          category_id,
          created_at
        ) VALUES (
          '${cars.id}',
          '${cars.name}',
          '${cars.description}',
          '${cars.daily_rate}',
          '${cars.available}',
          '${cars.license_plate}',
          '${cars.fine_amount}',
          '${cars.brand}',
          '${cars.category_id}',
          '${cars.created_at}'
        )
      `)
    );
  });

  const carsCreated = await Promise.all(promises);
  console.log(`${carsCreated.length} cars successfully created`);
  console.log(`CARS table seeding finished\n`);
}

export async function Cars(prisma: PrismaClient): Promise<void> {
  await Seed(prisma);
}
