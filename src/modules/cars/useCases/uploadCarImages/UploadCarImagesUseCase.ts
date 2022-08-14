import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppErrors';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
  url: string;
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}
  async execute({ car_id, images_name, url }: IRequest): Promise<void> {
    const carExists = await this.carImagesRepository.listByCarId(car_id);

    if (!carExists) throw new AppError('Car not found', 404);

    const nonExistentImages = images_name.filter((name) =>
      carExists.filter((image) => image.name !== name)
    );

    if (nonExistentImages.length < 1)
      throw new AppError('All the images already exists', 304);

    await this.carImagesRepository.createMany(
      nonExistentImages.map((image) => ({
        car_id,
        name: image,
        url,
      }))
    );
  }
}
