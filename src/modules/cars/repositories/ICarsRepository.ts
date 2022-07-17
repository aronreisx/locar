import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '../models/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
}
