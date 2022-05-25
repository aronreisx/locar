import { inject, injectable } from 'tsyringe';
import { Category } from '../../models/Category';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
