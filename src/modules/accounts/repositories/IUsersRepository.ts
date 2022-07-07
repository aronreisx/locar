import { User } from '../models/User';
import { ICreateUserDTO } from '../dto/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
