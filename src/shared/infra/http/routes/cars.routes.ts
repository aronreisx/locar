import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { AddCarSpecificationsController } from '@modules/cars/useCases/addCarSpecifications/AddCarSpecificationsController';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addCarSpecificationsController = new AddCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureAdmin,
  addCarSpecificationsController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthentication,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);
