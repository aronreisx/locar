import { ISpecification } from '../models/Specification';

export interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<ISpecification | null>;
  findByIds(ids: string[]): Promise<ISpecification[]>;
}
