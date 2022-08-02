import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { IUser } from '../models/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
