import * as argon2 from 'argon2';
import { exec } from 'child_process';
import * as util from 'util';

import { IUser } from '@modules/accounts/models/User';
import { IDatabaseClient } from '@shared/infra/http/database';

type Table = { table_name: string };

export class DatabaseUtils {
  constructor(private databaseClient: IDatabaseClient) {}
  execPromisify = util.promisify(exec);

  public runMigrations = async (environment = 'test'): Promise<void> => {
    try {
      await this.execPromisify(`make ENV=${environment} prisma-migrate`);
    } catch (error) {
      console.log(error);
    }
  };

  public resetDatabase = async (environment = 'test'): Promise<void> => {
    try {
      await this.execPromisify(`make ENV=${environment} prisma-reset`);
    } catch (error) {
      console.log(error);
    }
  };

  private getPublicTables = async (): Promise<string[]> => {
    const tables: Table[] = await this.databaseClient.$queryRawUnsafe(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE'
      AND table_schema='public';
    `);
    return tables.map((table) => table.table_name);
  };

  public truncateAllTables = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Truncate all tables is not allowed in production');
      return;
    }

    const tables: string[] = await this.getPublicTables();

    const tablesWithoutPrismaMigrations = tables.filter((table) => {
      return table !== '_prisma_migrations' ?? table;
    });

    try {
      await this.databaseClient.$transaction([
        ...tablesWithoutPrismaMigrations.map((table) =>
          this.databaseClient.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  public createUser = async (data: IUser): Promise<void> => {
    const hashedPassword = await argon2.hash(data.password);
    try {
      await this.databaseClient.$queryRawUnsafe(`
        INSERT INTO users (
          id,
          name,
          email,
          password,
          driver_license,
          avatar,
          admin
        ) VALUES (
          '${data.id}',
          '${data.name}',
          '${data.email}',
          '${hashedPassword}',
          '${data.driver_license}',
          '${data.avatar}',
          '${data.admin}'
        );
      `);
    } catch (error) {
      console.log(error);
    }
  };

  public disconnect = async (): Promise<void> => {
    await this.databaseClient.$disconnect();
  };
}
