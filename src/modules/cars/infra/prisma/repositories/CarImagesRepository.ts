import { IUploadCarImageDTO } from '@modules/cars/dto/IUploadCarImageDTO';
import { ICarImage } from '@modules/cars/models/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

export class CarImagesRepository implements ICarImagesRepository {
  private carImages = prismaClient.carImages;

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
