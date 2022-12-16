import { ICategory } from '@modules/cars/models/Category';
import { databaseClient } from '@shared/infra/http/database';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository = databaseClient.category;

  async create({ name, description }: ICreateCategoryDTO): Promise<ICategory> {
    const category = await this.repository.create({
      data: {
        name,
        description,
      },
    });
    return category;
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
