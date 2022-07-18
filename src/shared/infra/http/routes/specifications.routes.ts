import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

export const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthentication);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);
