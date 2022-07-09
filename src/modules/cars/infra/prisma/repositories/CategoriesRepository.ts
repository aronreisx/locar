import { Category } from '@modules/cars/models/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoriesRepository';

import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

class CategoriesRepository implements ICategoryRepository {
  private repository = prismaClient.category;

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    await this.repository.create({
      data: {
        name,
        description,
      }
    })
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.findMany();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findFirst({
      where: { name }
    });
    return category;
  }
}

export { CategoriesRepository };