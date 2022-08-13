import {
  ISpecificationsRepository,
  ICreateSpecificationsDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository = prismaClient.specification;

  async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
    await this.repository.create({
      data: {
        name,
        description,
      },
    });
  }

  async findByName(name: string): Promise<ISpecification | null> {
    const specification = await this.repository.findFirst({
      where: { name },
    });
    return specification;
  }
}
