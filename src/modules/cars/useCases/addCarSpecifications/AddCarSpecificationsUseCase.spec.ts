import { AppError } from '@errors/AppErrors';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CarsSpecificationsInMemory } from '@modules/cars/repositories/in-memory/CarsSpecificationsInMemory';

import { AddCarSpecificationsUseCase } from './AddCarSpecificationsUseCase';

let addCarSpecificationsUseCase: AddCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let carsSpecificationsInMemory: CarsSpecificationsInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    carsSpecificationsInMemory = new CarsSpecificationsInMemory();
    addCarSpecificationsUseCase = new AddCarSpecificationsUseCase(
      carsRepositoryInMemory,
      carsSpecificationsInMemory
    );
  });

  it('should not be able to addd a new speicifcation to a non-existent car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_ids = ['456'];
      await addCarSpecificationsUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a new car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ACB-4123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    const specifications_ids = ['456', '12541'];

    await addCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });

    const carsSpecifications = await carsSpecificationsInMemory.findById(
      car.id
    );

    const createdCarsSpecifications = carsSpecifications.map(
      (specificationCar) => specificationCar.specification_id
    );

    expect(createdCarsSpecifications).toEqual(specifications_ids);
  });
});
