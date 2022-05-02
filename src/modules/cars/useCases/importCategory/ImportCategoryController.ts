import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  handle(resquest: Request, response: Response) {
    const { file } = resquest;

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
