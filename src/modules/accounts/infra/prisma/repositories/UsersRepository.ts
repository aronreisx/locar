import { ICreateUserDTO } from '@modules/accounts/dto/ICreateUserDTO';
import { IUser } from '@modules/accounts/models/User';
import { databaseClient } from '@shared/infra/http/database';

import { IUsersRepository } from '../../../repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository = databaseClient.user;

  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.create({ data });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findFirst({
      where: { email },
    });
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.repository.findUnique({
      where: { id },
    });
    return user;
  }
}
