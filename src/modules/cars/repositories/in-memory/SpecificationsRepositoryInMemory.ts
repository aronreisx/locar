import { v4 as uuidv4 } from 'uuid';

import { ISpecification } from '@modules/cars/models/Specification';

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  repository: ISpecification[] = [];

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    const specification: ISpecification = {
      id: uuidv4(),
      name,
      description,
      created_at: new Date(),
    };

    this.repository.push(specification);
  }

  async findByName(name: string): Promise<ISpecification | null> {
    const specification = this.repository.find(
      (specification) => specification.name === name
    );

    return specification || null;
  }

  async findByIds(ids: string[]): Promise<ISpecification[]> {
    const allSpecifications = this.repository.filter((specification) => {
      if (ids.includes(specification.id)) {
        return specification;
      }
      return null;
    });

    return allSpecifications;
  }
}
