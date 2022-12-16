import * as argon2 from 'argon2';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

interface IRquest {
  token: string;
  password: string;
}

@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: DayjsDateProvider
  ) {}
  async execute({ token, password }: IRquest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);
    if (!userToken) throw new AppError('Invalid token!');

    const isTokenExpired = this.dateProvider.compareIfDatesBefore(
      userToken.expiring_date,
      this.dateProvider.dateNow()
    );

    if (isTokenExpired) throw new AppError('Token expired!');

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User not found');

    const hashedPassword = await argon2.hash(password);

    await this.usersRepository.create({ ...user, password: hashedPassword });
    await this.userTokensRepository.deleteById(userToken.id);
  }
}
