import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

let listRentalsByUserUseCase: ListRentalsByUserUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('List Cars', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      rentalsRepositoryInMemory
    );
  });

  it('should be able to list all rentals', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Beetle',
      description: 'Nice car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 25,
      brand: 'Volkswagen',
      category_id: '1',
    });

    const rental = await rentalsRepositoryInMemory.create({
      car_id: car.id,
      user_id: '1234',
      start_date: dateProvider.dateNow(),
      expected_return_date: dateProvider.dateTomorrow(),
    });

    const rentals = await listRentalsByUserUseCase.execute(rental.user_id);
    expect(rentals).toEqual([rental]);
  });
});
