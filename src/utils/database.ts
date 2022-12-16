import users from '@prismaFolder/seed/users/data/users.json';
import { databaseClient } from '@shared/infra/http/database';

export const getPublicTables = async (): Promise<string[]> => {
  const tables: { table_name: string }[] =
    await databaseClient.$queryRawUnsafe(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_type='BASE TABLE'
    AND table_schema='public';
  `);

  const tablesWithoutPrismaMigrations = tables
    .filter((table) => {
      return table.table_name !== '_prisma_migrations';
    })
    .map((table) => {
      return table.table_name;
    });

  return tablesWithoutPrismaMigrations;
};

export const truncateTables = async (tableNames?: string[]): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Truncate tables is not allowed in production');
    return;
  }

  const allTables = await getPublicTables();
  const tables = tableNames ?? allTables;

  try {
    await databaseClient.$transaction([
      ...tables.map((table) =>
        databaseClient.$executeRawUnsafe(
          `TRUNCATE "public"."${table}" CASCADE;`
        )
      ),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const getSeededAdminUser = (): object => {
  const admin = users.find((user) => {
    return user.admin;
  });

  const adminCredentials = {
    email: admin?.email,
    password: admin?.password,
  };

  return adminCredentials;
};
