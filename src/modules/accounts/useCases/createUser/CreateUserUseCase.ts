import { inject, injectable } from 'tsyringe';
import * as argon2 from 'argon2';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    data.password = await argon2.hash(data.password);
    await this.usersRepository.create(data);
  }
}
