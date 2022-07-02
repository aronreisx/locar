import { v4 as uuidv4 } from 'uuid';

import { AppError } from '@errors/AppErrors';
import { Category } from '@modules/cars/models/Category';

import {
  ICategoryRepository,
  ICreateCategoryDTO
} from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoryRepository {
  repository: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    this.repository.push(
      {
        id: uuidv4(),
        name,
        description,
        created_at: new Date()
      }
    )
  };

    async list(): Promise<Category[]> {
      return this.repository;
    };

  async findByName(name: string): Promise<Category | null> {
    const category = this.repository.find((category) => {
      category.name === name
    });
    if(!category) throw new AppError('Category doesn\'t exists', 400);
    return category;
  };
}
