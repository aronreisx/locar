import { IAddCarSpecificationDTO } from '@modules/cars/dto/IAddCarSpecificationDTO';
import { ICarSpecification } from '@modules/cars/models/CarSpecification';
import { ICarsSpecificationsRepository } from '@modules/cars/repositories/ICarsSpecificationsRepository';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

export class CarsSpecificationsRepository
  implements ICarsSpecificationsRepository
{
  private repository = prismaClient.carsSpecifications;

  async createMany(data: IAddCarSpecificationDTO[]): Promise<void> {
    await this.repository.createMany({ data });
  }

  async findById(
    car_id?: string,
    specification_id?: string
  ): Promise<ICarSpecification[]> {
    const carsSpecifications = await this.repository.findMany({
      where: {
        AND: [{ car_id }, { specification_id }],
      },
    });

    return carsSpecifications;
  }
}
