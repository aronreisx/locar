import { ICategory } from '@modules/cars/models/Category';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository = prismaClient.category;

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    await this.repository.create({
      data: {
        name,
        description,
      },
    });
  }

  async list(): Promise<ICategory[]> {
    const categories = await this.repository.findMany();
    return categories;
  }

  async findByName(name: string): Promise<ICategory | null> {
    const category = await this.repository.findFirst({
      where: { name },
    });
    return category;
  }
}
