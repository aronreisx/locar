import * as argon2 from 'argon2';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICreateUserDTO } from '@modules/accounts/dto/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

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
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await argon2.hash(password);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}
