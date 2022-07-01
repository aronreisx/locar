import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppErrors";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

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
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      'a5a28cfe2786537d28d4f57d4a15fe5813a973d3d6f9b9186033b8df50fac56b'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: userId
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
