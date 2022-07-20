import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../models/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
