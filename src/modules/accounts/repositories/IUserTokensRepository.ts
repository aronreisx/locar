import { ICreateUserTokenDTO } from '../dto/ICreateUserTokenDTO';
import { IUserTokens } from '../models/UserTokens';

export interface IUserTokensRepository {
  create({
    expiring_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<IUserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserTokens | null>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<IUserTokens | null>;
}
