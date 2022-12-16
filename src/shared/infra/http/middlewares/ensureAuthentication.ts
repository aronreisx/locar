import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppErrors';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.token_secret) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
