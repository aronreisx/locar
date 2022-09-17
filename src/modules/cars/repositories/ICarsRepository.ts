import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { ICar } from '../models/Car';
import { ICarSpecification } from '../models/CarSpecification';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<ICar>;

  findByLicensePlate(license_plate: string): Promise<ICar | null>;

  listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<ICar[]>;

  findById(id: string): Promise<ICar | null>;

  findByIdWithSpecifications(
    id: string
  ): Promise<(ICar & { specifications: ICarSpecification[] }) | null>;

  updateAvailability(id: string, availability: boolean): Promise<ICar>;
}
