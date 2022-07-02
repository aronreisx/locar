import { v4 as uuidv4 } from 'uuid';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from '@modules/accounts/models/User';
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  repository: User[] = [];

  async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = {
      id: uuidv4(),
      name,
      password,
      email,
      driver_license,
      admin: false,
      created_at: new Date()
    }

    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.find((user) => {
      user.email === email
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.repository.find((user) => {
      user.id === id
    });

    return user;
  }
}
