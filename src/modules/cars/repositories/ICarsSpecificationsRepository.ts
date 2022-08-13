import { IAddCarSpecificationDTO } from '@modules/cars/dto/IAddCarSpecificationDTO';

import { ICarSpecification } from '../models/CarSpecification';

export interface ICarsSpecificationsRepository {
  createMany(data: IAddCarSpecificationDTO[]): Promise<void>;
  findById(
    car_id?: string,
    specification_id?: string
  ): Promise<ICarSpecification[]>;
}
