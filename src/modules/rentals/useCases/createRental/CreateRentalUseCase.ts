import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRental } from '@modules/rentals/models/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  user_id: string;
  car_id: string;
  start_date: Date;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({
    user_id,
    car_id,
    start_date,
    expected_return_date,
  }: IRequest): Promise<IRental | null> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) throw new AppError('Car is already rented');

    const rentalOpenByUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenByUser)
      throw new AppError('The user has a rental in progress');

    const compare = this.dateProvider.compareInHours(
      start_date,
      expected_return_date
    );

    const minimumRentingHours = 24;

    if (compare < minimumRentingHours)
      throw new AppError('The minimum rental time is 24 hours');

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      start_date,
      expected_return_date,
    });

    await this.carsRepository.updateAvailability(car_id, false);

    return rental;
  }
}
