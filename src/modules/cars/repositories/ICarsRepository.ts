import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '../models/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
  listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}
