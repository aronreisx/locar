import { v4 as uuidv4 } from 'uuid';

import { ICar } from '@modules/cars/models/Car';
import { ICarSpecification } from '@modules/cars/models/CarSpecification';

import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: ICar[] = [];
  carsSpecifications: ICarSpecification[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<ICar> {
    const car: ICar = {
      id: uuidv4(),
      name,
      description,
      daily_rate,
      available: true,
      license_plate,
      fine_amount,
      brand,
      category_id,
      created_at: new Date(),
    };

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar | null> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    if (!car) return null;
    return car;
  }

  async listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<ICar[]> {
    const availableCars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return availableCars;
  }

  async findById(id: string): Promise<ICar | null> {
    return this.cars.find((car) => car.id === id) || null;
  }

  async findByIdWithSpecifications(
    id: string
  ): Promise<(ICar & { specifications: ICarSpecification[] }) | null> {
    const car = this.cars.find((car) => car.id === id);

    if (!car) return null;

    const specifications = this.carsSpecifications.filter(
      (specification) => specification.car_id === id
    );

    return { ...car, specifications };
  }
}
