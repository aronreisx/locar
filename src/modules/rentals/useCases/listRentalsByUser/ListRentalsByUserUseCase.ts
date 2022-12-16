import { inject, injectable } from 'tsyringe';

import { IRental } from '@modules/rentals/models/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string): Promise<IRental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}
