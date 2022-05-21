import { Category } from '../../models/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

import { prismaClient } from '../../../../database/prismaClient';

class CategoriesRepository implements ICategoryRepository {
  private repository = prismaClient.category;
  private static INSTANCE: CategoriesRepository;

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

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
