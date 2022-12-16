import { ICategory } from '../models/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<ICategory | null>;
  list(): Promise<ICategory[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<ICategory>;
}
