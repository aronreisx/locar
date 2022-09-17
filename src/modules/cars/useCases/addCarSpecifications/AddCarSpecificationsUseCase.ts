import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsSpecificationsRepository } from '@modules/cars/repositories/ICarsSpecificationsRepository';

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
export class AddCarSpecificationsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarsSpecificationsRepository')
    private carsSpecificationsRepository: ICarsSpecificationsRepository
  ) {}
  async execute({ car_id, specifications_ids }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findByIdWithSpecifications(
      car_id
    );

    if (!carExists) {
      throw new AppError('Car not found', 404);
    }

    const nonExistentSpecifications = specifications_ids.filter((id) =>
      carExists.specifications.filter((spec) => spec.specification_id !== id)
    );

    if (nonExistentSpecifications.length < 1) {
      throw new AppError('All the specifications already exists', 304);
    }

    await this.carsSpecificationsRepository.createMany(
      nonExistentSpecifications.map((id) => ({
        car_id,
        specification_id: id,
      }))
    );
  }
}
