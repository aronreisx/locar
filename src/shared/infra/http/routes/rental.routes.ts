import { Router } from 'express';

import { CloseRentalController } from '@modules/rentals/useCases/closeRental/CloseRentalController';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const closeRentalController = new CloseRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthentication, createRentalController.handle);

rentalsRoutes.post(
  '/close/:id',
  ensureAuthentication,
  closeRentalController.handle
);

rentalsRoutes.get(
  '/user',
  ensureAuthentication,
  listRentalsByUserController.handle
);
