import { ICreateUserTokenDTO } from '@modules/accounts/dto/ICreateUserTokenDTO';
import { IUserTokens } from '@modules/accounts/models/UserTokens';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { databaseClient } from '@shared/infra/http/database';

export class UserTokensRepository implements IUserTokensRepository {
  private repository = databaseClient.userTokens;
  async create({
    expiring_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<IUserTokens> {
    const userToken = await this.repository.create({
      data: {
        expiring_date,
        refresh_token,
        user_id,
      },
    });
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserTokens | null> {
    const userTokens = await this.repository.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<IUserTokens | null> {
    const userToken = await this.repository.findFirst({
      where: { refresh_token },
    });
    return userToken;
  }
}
