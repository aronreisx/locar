import * as argon2 from 'argon2';

import { PrismaClient, User } from '@prisma/client';

import data from './data/users.json';

// HACK: To bypass strict Date type from Prisma
interface ISeedUser extends Omit<User, 'created_at'> {
  created_at: string | Date;
}

const usersData: ISeedUser[] = data;

async function Seed(prisma: PrismaClient) {
  const promises: Promise<ISeedUser>[] = [];
  console.log(`USERS table seeding start...`);

  for await (const user of usersData) {
    const hashedPassword = await argon2.hash(user.password);

    promises.push(
      prisma.$queryRawUnsafe<User>(`
        INSERT INTO users (
          id,
          name,
          email,
          password,
          driver_license,
          avatar,
          admin,
          created_at
        ) VALUES (
          '${user.id}',
          '${user.name}',
          '${user.email}',
          '${hashedPassword}',
          '${user.driver_license}',
          '${user.avatar}',
          ${user.admin},
          '${user.created_at}'
        )
      `)
    );
  }

  const usersCreated = await Promise.all(promises);
  console.log(`${usersCreated.length} users successfully created`);
  console.log(`USERS table seeding finished\n`);
}

export async function Users(prisma: PrismaClient): Promise<void> {
  await Seed(prisma);
}
