import { inject, injectable } from 'tsyringe';

import { ICategory } from '@modules/cars/models/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<ICategory[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
