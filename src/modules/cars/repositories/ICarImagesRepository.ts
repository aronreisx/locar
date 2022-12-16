import { IUploadCarImageDTO } from '@modules/cars/dto/IUploadCarImageDTO';

import { ICarImage } from '../models/CarImage';

export interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<ICarImage>;
  createMany(data: IUploadCarImageDTO[]): Promise<void>;
  listByCarId(car_id: string): Promise<ICarImage[]>;
}
