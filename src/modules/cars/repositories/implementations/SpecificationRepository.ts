import { Specification } from '@modules/cars/models/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationsDTO,
} from '../ISpecificationsRepository';

import { prismaClient } from '@database/prismaClient';

class SpecificationsRepository implements ISpecificationRepository {
  private repository = prismaClient.specification;

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    await this.repository.create({
      data: {
        name,
        description,
      }
    })
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findFirst({
      where: { name }
    });
    return specification;
  }
}

export { SpecificationsRepository };
