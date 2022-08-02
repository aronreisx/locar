import { v4 as uuidv4 } from 'uuid';

import { ICar } from '@modules/cars/models/Car';

import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: ICar[] = [];

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

    this.repository.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar | null> {

    if (!car) return null;
    return car;
  }

  async listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<ICar[]> {
    const availableCars = this.repository.filter((car) => {
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
}
