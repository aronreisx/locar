import { v4 as uuidv4 } from 'uuid';

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRental } from '@modules/rentals/models/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: IRental[] = [];

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental: IRental = {
      id: uuidv4(),
      car_id,
      user_id,
      start_date,
      expected_return_date,
      end_date: null,
      total: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.rentals.push(rental);
    return rental;
  }

  async update(data: IRental): Promise<IRental> {
    const { id } = data;
    const rentalIndex = this.rentals.findIndex((rental) => rental.id === id);
    this.rentals[rentalIndex] = data;
    return this.rentals[rentalIndex];
  }

  async findOpenRentalByCar(car_id: string): Promise<IRental | null> {
    return (
      this.rentals.find(
        (rental) => rental.car_id === car_id && !rental.end_date
      ) || null
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<IRental | null> {
    return (
      this.rentals.find(
        (rental) => rental.user_id === user_id && !rental.end_date
      ) || null
    );
  }

  async findById(id: string): Promise<IRental | null> {
    const rentalIndex = this.rentals.findIndex((rental) => rental.id === id);
    return this.rentals[rentalIndex] || null;
  }

  async findByUser(user_id: string): Promise<IRental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);
    return rentals;
  }
}
