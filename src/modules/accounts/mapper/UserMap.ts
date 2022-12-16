import { IUserResponseDTO } from '../dto/IUserResponseDTO';
import { IUser } from '../models/User';

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: IUser): IUserResponseDTO {
    const getAvatarUrl = (): string => {
      switch (process.env.STORAGE_DISK) {
        case 'local':
          return `${process.env.SERVER_URL}/avatar/${avatar}`;
        case 's3':
          return `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
        default:
          return `${process.env.AWS_BUCKET_URL}/avatar/image_not_exists`;
      }
    };

    return {
      email,
      name,
      id,
      avatar,
      avatar_url: getAvatarUrl(),
      driver_license,
    };
  }
}
