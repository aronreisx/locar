import { Router } from 'express';

import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController';

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthentication);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
