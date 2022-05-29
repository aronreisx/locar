import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(resquest: Request, response: Response) {
    const { file } = resquest;

    if (!file) {
      return response.status(400).json({ message: 'File not found' })
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    await importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
