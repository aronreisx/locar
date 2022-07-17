import { AppError } from '@errors/AppErrors';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should not be able to create a car with the same license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ACB-4123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ACB-4123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Supra',
      description: 'Fast car',
      daily_rate: 180,
      license_plate: 'ARN-9999',
      fine_amount: 90,
      brand: 'Toyota',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });
});
