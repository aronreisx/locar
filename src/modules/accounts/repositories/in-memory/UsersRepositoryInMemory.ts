import { v4 as uuidv4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dto/ICreateUserDTO';
import { IUser } from '@modules/accounts/models/User';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  repository: IUser[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = {
      id: uuidv4(),
      name,
      password,
      email,
      driver_license,
      admin: false,
      created_at: new Date(),
      avatar: ''
    };

    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.repository.find((user) => {
      return user.email === email;
    });

    if (!user) return null;
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = this.repository.find((user) => {
      return user.id === id;
    });

    if (!user) return null;
    return user;
  }
}
