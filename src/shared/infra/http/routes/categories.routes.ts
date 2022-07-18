import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

export const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthentication);

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthentication,
  ensureAdmin,
  importCategoryController.handle
);
