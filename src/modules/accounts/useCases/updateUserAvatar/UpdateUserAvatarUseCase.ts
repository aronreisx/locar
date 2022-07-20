import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exists', 401);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
