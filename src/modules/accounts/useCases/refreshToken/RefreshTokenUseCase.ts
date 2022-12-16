import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { AppError } from '@errors/AppErrors';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refresh_token_secret) as IPayload;
    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError('Refresh Token does not exists');

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: sub,
      expiresIn: auth.refresh_token_expiration,
    });

    const expiring_date = this.dateProvider.addDays(
      auth.refresh_token_expiration_in_days
    );

    await this.userTokensRepository.create({
      expiring_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.token_secret, {
      subject: user_id,
      expiresIn: auth.token_expiration,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
