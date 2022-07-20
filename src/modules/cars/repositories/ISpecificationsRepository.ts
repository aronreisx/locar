import { Specification } from '../models/Specification';

export interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification | null>;
}
