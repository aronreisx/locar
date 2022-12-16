import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { IUserResponseDTO } from '@modules/accounts/dto/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User does not exist');

    return UserMap.toDTO(user);
  }
}
