import { inject, injectable } from 'tsyringe';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password invalid');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new Error('Email or password invalid');
    }

    const token = sign(
      {},
      'a5a28cfe2786537d28d4f57d4a15fe5813a973d3d6f9b9186033b8df50fac56b',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}
