import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carExists = await this.carImagesRepository.listByCarId(car_id);

    if (!carExists) throw new AppError('Car not found', 404);

    const nonExistentImages = images_name.filter((name) =>
      carExists.filter((image) => image.name !== name)
    );

    if (nonExistentImages.length < 1)
      throw new AppError('All the images already exists', 304);

    images_name.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
