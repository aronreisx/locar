import { ICreateRentalDTO } from '../dto/ICreateRentalDTO';
import { IRental } from '../models/Rental';

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<IRental>;
  update(data: IRental): Promise<IRental>;
  findOpenRentalByCar(car_id: string): Promise<IRental | null>;
  findOpenRentalByUser(user_id: string): Promise<IRental | null>;
  findById(id: string): Promise<IRental | null>;
}
