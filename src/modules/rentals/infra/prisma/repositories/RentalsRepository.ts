import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRental } from '@modules/rentals/models/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { databaseClient } from '@shared/infra/http/database';

export class RentalsRepository implements IRentalsRepository {
  private rentals = databaseClient.rental;

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental = await this.rentals.create({
      data: {
        car_id,
        user_id,
        start_date,
        expected_return_date,
      },
    });
    return rental;
  }

  async update(data: IRental): Promise<IRental> {
    const { id } = data;
    const updatedRental = await this.rentals.update({
      where: { id },
      data,
    });
    return updatedRental;
  }

  async findOpenRentalByCar(car_id: string): Promise<IRental | null> {
    const rental = await this.rentals.findFirst({
      where: {
        car_id,
        AND: [
          {
            end_date: null,
          },
        ],
      },
    });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<IRental | null> {
    const rental = await this.rentals.findFirst({
      where: {
        user_id,
        AND: [
          {
            end_date: null,
          },
        ],
      },
    });
    return rental;
  }

  async findById(id: string): Promise<IRental | null> {
    const rental = await this.rentals.findFirst({
      where: { id },
    });
    return rental;
  }

  async findByUser(user_id: string): Promise<IRental[]> {
    const userRentals = await this.rentals.findMany({
      where: { user_id },
      include: {
        car: true,
      },
    });
    return userRentals;
  }
}
