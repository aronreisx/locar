import { AppError } from '@errors/AppErrors';
import { ICar } from '@modules/cars/models/Car';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

let car: ICar;

describe('Create rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );

    car = await carsRepositoryInMemory.create({
      name: 'Gayleen',
      description: 'erat id mauris vulputate elementum nullam varius nulla',
      daily_rate: 33,
      license_plate: 'WBALY1C57ED108938',
      fine_amount: 34,
      brand: 'Plymouth',
      category_id: 'f0ddf096-2c72-4987-852b-9042da6770bb',
    });
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123',
      car_id: car.id,
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });
    expect(rental).toHaveProperty('id');
  });

  it('should reject rentals if the user has another active rent', async () => {
    await createRentalUseCase.execute({
      user_id: '123',
      car_id: car.id,
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: car.id,
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should reject rentals for a rented car', async () => {
    await createRentalUseCase.execute({
      user_id: '1s1xa23',
      car_id: car.id,
      start_date: dayjsDateProvider.dateNow(),
      expected_return_date: dayjsDateProvider.dateTomorrow(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1s1xa23',
        car_id: car.id,
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateTomorrow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should reject rentals of less than 24h', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '1s1xa23',
        car_id: car.id,
        start_date: dayjsDateProvider.dateNow(),
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
