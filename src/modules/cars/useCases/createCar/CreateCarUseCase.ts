import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICar } from '@modules/cars/models/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute(data: IRequest): Promise<ICar> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) throw new AppError('Car already exists');

    const car = await this.carsRepository.create(data);

    return car;
  }
}
