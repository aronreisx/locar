import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICategory } from '@modules/cars/models/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<ICategory> {
    const categoryExists = await this.categoriesRepository.findByName(name);
    if (categoryExists) throw new AppError('Category already exists', 400);
    return this.categoriesRepository.create({ name, description });
  }
}
