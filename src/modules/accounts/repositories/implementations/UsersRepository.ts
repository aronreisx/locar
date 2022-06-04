import { prismaClient } from '../../../../database/prismaClient';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository = prismaClient.user;

  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.create({ data });
  }
}
