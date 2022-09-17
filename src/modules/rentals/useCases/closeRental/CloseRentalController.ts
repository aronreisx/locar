import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CloseRentalUseCase } from './CloseRentalUseCase';

export class CloseRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const closeRentalUseCase = container.resolve(CloseRentalUseCase);

    const rental = await closeRentalUseCase.execute({
      id,
    });

    return response.status(200).json(rental);
  }
}
