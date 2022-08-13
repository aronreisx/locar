import { v4 as uuidv4 } from 'uuid';

import { AppError } from '@errors/AppErrors';
import { IAddCarSpecificationDTO } from '@modules/cars/dto/IAddCarSpecificationDTO';
import { ICarSpecification } from '@modules/cars/models/CarSpecification';

import { ICarsSpecificationsRepository } from '../ICarsSpecificationsRepository';

export class CarsSpecificationsInMemory
  implements ICarsSpecificationsRepository
{
  private carsSpecifications: ICarSpecification[] = [];

  async createMany(data: IAddCarSpecificationDTO[]): Promise<void> {
    data.forEach((item) => {
      const specificationCar: ICarSpecification = {
        id: uuidv4(),
        car_id: item.car_id,
        specification_id: item.specification_id,
        created_at: new Date(),
      };
      this.carsSpecifications.push(specificationCar);
    });
  }

  async findById(
    car_id?: string,
    specification_id?: string
  ): Promise<ICarSpecification[]> {
    if (!car_id && !specification_id) {
      throw new AppError('Missing car id or specification id', 400);
    }

    const carsSpecifications = this.carsSpecifications.filter(
      (specificationCar) => {
        if (
          (car_id && specificationCar.car_id === car_id) ||
          (specification_id &&
            specificationCar.specification_id === specification_id)
        ) {
          return specificationCar;
        }
        return null;
      }
    );

    return carsSpecifications;
  }
}
