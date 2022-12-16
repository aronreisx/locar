import { v4 as uuidv4 } from 'uuid';

import { ICreateUserTokenDTO } from '@modules/accounts/dto/ICreateUserTokenDTO';
import { IUserTokens } from '@modules/accounts/models/UserTokens';

import { IUserTokensRepository } from '../IUserTokensRepository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  usersTokens: IUserTokens[] = [];

  async create({
    expiring_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<IUserTokens> {
    const userToken: IUserTokens = {
      id: uuidv4(),
      expiring_date,
      refresh_token,
      user_id,
      created_at: new Date(),
    };
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserTokens | null> {
    const userToken = this.usersTokens.find(
      (element) =>
        element.user_id === user_id && element.refresh_token && refresh_token
    );
    return userToken || null;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((element) => element.id === id);
    if (userToken) this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<IUserTokens | null> {
    const userToken = this.usersTokens.find(
      (element) => element.refresh_token === refresh_token
    );
    return userToken || null;
  }
}
