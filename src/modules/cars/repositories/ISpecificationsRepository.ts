import { Specification } from '../models/Specification';

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  findByName(name: string): Promise<Specification | null>;
}

export { ISpecificationRepository, ICreateSpecificationsDTO };
