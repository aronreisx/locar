import * as argon2 from 'argon2';

import { IUser } from '@modules/accounts/models/User';
import { IDatabaseClient } from '@shared/infra/http/database';

export const createUser = async (
  databaseClient: IDatabaseClient,
  data: IUser
): Promise<void> => {
  const hashedPassword = await argon2.hash(data.password);
  try {
    await databaseClient.$queryRawUnsafe(`
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
