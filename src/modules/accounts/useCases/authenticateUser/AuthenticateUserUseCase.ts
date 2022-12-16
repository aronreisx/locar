import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppErrors';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new AppError('Email or password invalid', 401);
    }

    const token = sign({}, auth.token_secret, {
      subject: user.id,
      expiresIn: auth.token_expiration,
    });

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user.id,
      expiresIn: auth.refresh_token_expiration,
    });

    const refresh_token_expiring_date = this.dateProvider.addDays(
      auth.refresh_token_expiration_in_days
    );

    await this.userTokensRepository.create({
      user_id: user.id,
      expiring_date: refresh_token_expiring_date,
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}
