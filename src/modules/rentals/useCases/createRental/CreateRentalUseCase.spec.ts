import { AppError } from '@errors/AppErrors';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: '23131',
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });
    expect(rental).toHaveProperty('id');
  });

  it('should reject rentals if the user has another active rent', async () => {
    await createRentalUseCase.execute({
      user_id: '123',
      car_id: '23131',
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '23131',
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should reject rentals for a rented car', async () => {
    await createRentalUseCase.execute({
      user_id: '1s1xa23',
      car_id: '1fxg412',
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1s1xa23',
        car_id: '1fxg412',
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should reject rentals of less than 24h', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1s1xa23',
        car_id: '1fxg412',
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
