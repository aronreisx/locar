import { inject, injectable } from 'tsyringe';

import { ICar } from '@modules/cars/models/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<ICar[]> {
    const cars = await this.carsRepository.listAvailable(
      category_id,
      brand,
      name
    );
    return cars;
  }
}
