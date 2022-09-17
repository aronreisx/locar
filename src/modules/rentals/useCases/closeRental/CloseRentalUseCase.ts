import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  id: string;
}

@injectable()
export class CloseRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) throw new AppError('Rental does not exists', 400);

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) throw new AppError('Car does not exists', 400);

    const dateNow = this.dateProvider.dateNow();

    const billableRentingDays = () => {
      const minimumBillingDays = 1;
      const rentalStartToDevolutionInDays = this.dateProvider.compareInDays(
        rental.start_date,
        this.dateProvider.dateNow()
      );

      return rentalStartToDevolutionInDays <= 0
        ? minimumBillingDays
        : rentalStartToDevolutionInDays;
    };

    const returnalDelayDays = () => {
      if (dateNow < rental.expected_return_date) return 0;
      return this.dateProvider.compareInDays(
        rental.expected_return_date,
        dateNow
      );
    };

    const totalRentCharge = billableRentingDays() * car.daily_rate;
    const fullFineCharge = returnalDelayDays() * car.fine_amount;
    const fullBillingCharge = totalRentCharge + fullFineCharge;

    const updatedRental = await this.rentalsRepository.update({
      ...rental,
      total: fullBillingCharge,
      end_date: dateNow,
    });

    await this.carsRepository.updateAvailability(car.id, true);

    return updatedRental;
  }
}
