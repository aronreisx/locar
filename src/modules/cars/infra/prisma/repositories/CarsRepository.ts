import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { ICar } from '@modules/cars/models/Car';
import { ICarSpecification } from '@modules/cars/models/CarSpecification';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { prismaClient } from '@shared/infra/http/prisma/prismaClient';

export class CarsRepository implements ICarsRepository {
  private repository = prismaClient.car;

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<ICar> {
    const car = await this.repository.create({
      data: {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      },
    });

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar | null> {
    const car = await this.repository.findFirst({
      where: { license_plate },
    });
    return car;
  }

  async listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<ICar[]> {
    const availableCars = await this.repository.findMany({
      where: {
        available: true,
        AND: [{ category_id }, { brand }, { name }],
      },
    });

    return availableCars;
  }

  async findById(id: string): Promise<ICar | null> {
    const car = await this.repository.findFirst({
      where: { id },
    });
    return car;
  }

  async findByIdWithSpecifications(
    id: string
  ): Promise<(ICar & { specifications: ICarSpecification[] }) | null> {
    const car = await this.repository.findFirst({
      where: { id },
      include: {
        specifications: true,
      },
    });
    return car;
  }
}
