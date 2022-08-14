import { IUploadCarImageDTO } from '@modules/cars/dto/IUploadCarImageDTO';

import { ICarImage } from '../models/CarImage';

export interface ICarImagesRepository {
  createMany(data: IUploadCarImageDTO[]): Promise<void>;
  listByCarId(car_id: string): Promise<ICarImage[]>;
}
