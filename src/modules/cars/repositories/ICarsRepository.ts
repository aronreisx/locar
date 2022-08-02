import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { ICar } from '../models/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<ICar>;

  findByLicensePlate(license_plate: string): Promise<ICar | null>;

  listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}
