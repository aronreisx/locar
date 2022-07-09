import { Router } from 'express';
import multer from 'multer';

import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

categoriesRoutes.use(ensureAuthentication);

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post('/import', importCategoryController.handle);

export { categoriesRoutes };