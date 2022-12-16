import { IUploadCarImageDTO } from '@modules/cars/dto/IUploadCarImageDTO';
import { ICarImage } from '@modules/cars/models/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { databaseClient } from '@shared/infra/http/database';

export class CarImagesRepository implements ICarImagesRepository {
  private carImages = databaseClient.carImages;

  async create(car_id: string, image_name: string): Promise<ICarImage> {
    const carImage = await this.carImages.create({
      data: { car_id, name: image_name },
    });

    return carImage;
  }

  async createMany(data: IUploadCarImageDTO[]): Promise<void> {
    await this.carImages.createMany({ data });
  }

  async listByCarId(car_id: string): Promise<ICarImage[]> {
    const carsImages = await this.carImages.findMany({
      where: {
        car_id,
      },
    });

    return carsImages;
  }
}
