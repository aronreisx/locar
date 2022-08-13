import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddCarSpecificationsUseCase } from './AddCarSpecificationsUseCase';

export class AddCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_ids } = request.body;

    const addCarSpecificationsUseCase = container.resolve(
      AddCarSpecificationsUseCase
    );

    const cars = await addCarSpecificationsUseCase.execute({
      car_id: id,
      specifications_ids,
    });

    return response.status(201).json(cars);
  }
}
