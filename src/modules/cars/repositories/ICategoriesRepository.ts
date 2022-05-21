import { Category } from '../models/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICreateCategoryDTO, ICategoryRepository };
