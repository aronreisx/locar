import { ISpecification } from '@modules/cars/models/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationsDTO,
} from '../../../repositories/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationRepository {
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
