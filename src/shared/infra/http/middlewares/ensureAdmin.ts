import { NextFunction, Request, Response } from 'express';

import { AppError } from '@errors/AppErrors';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | AppError> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user?.admin) throw new AppError('User is not admin');

  return next();
}
