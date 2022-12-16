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
    const getAvatarUrl = (storageType?: string): string => {
      switch (storageType) {
        case 'local':
          return `${process.env.SERVER_URL}/avatar/${avatar}`;
        case 's3':
          return `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`;
        default:
          return `${process.env.AWS_BUCKET_URL}/avatar/image-does-not-exists`;
      }
    };

    return {
      email,
      name,
      id,
      avatar,
      avatar_url: getAvatarUrl(process.env.STORAGE_DISK),
      driver_license,
    };
  }
}
