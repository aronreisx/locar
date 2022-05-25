import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
