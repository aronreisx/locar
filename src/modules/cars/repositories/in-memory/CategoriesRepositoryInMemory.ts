import { v4 as uuidv4 } from 'uuid';

import { ICategory } from '@modules/cars/models/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  repository: ICategory[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<ICategory> {
    const category = {
      id: uuidv4(),
      name,
      description,
      created_at: new Date(),
    };
    this.repository.push(category);
    return category;
  }

  async list(): Promise<ICategory[]> {
    return this.repository;
  }

  async findByName(name: string): Promise<ICategory | null> {
    const category = this.repository.find((category) => {
      return category.name === name;
    });

    if (!category) return null;
    return category;
  }
}
