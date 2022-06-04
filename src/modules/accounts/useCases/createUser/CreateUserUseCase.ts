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

  async execute({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await argon2.hash(password);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    });
  }
}
