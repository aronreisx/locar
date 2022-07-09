import { User } from '@modules/accounts/models/User';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';
import { ICreateUserDTO } from '@modules/accounts/dto/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository = prismaClient.user;

  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: { email },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findUnique({
      where: { id },
    });
    return user;
  }
}