import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Beetle',
      description: 'Nice car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 25,
      brand: 'Volkswagen',
      category_id: '1',
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fiesta',
      description: 'Compact car',
      daily_rate: 145,
      license_plate: 'DSA-1234',
      fine_amount: 32,
      brand: 'Ford',
      category_id: '62542',
    });
    const cars = await listCarsUseCase.execute({ brand: 'Ford' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: '911',
      description: 'Super car',
      daily_rate: 574,
      license_plate: 'AST-4313',
      fine_amount: 145,
      brand: 'Porsche',
      category_id: '123513',
    });
    const cars = await listCarsUseCase.execute({ name: '911' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Models S',
      description: 'Electric car',
      daily_rate: 225,
      license_plate: 'ASD-1231',
      fine_amount: 65,
      brand: 'Tesla',
      category_id: '1231241',
    });
    const cars = await listCarsUseCase.execute({ category_id: '1231241' });
    expect(cars).toEqual([car]);
  });
});
