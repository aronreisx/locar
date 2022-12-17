import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import { AppError } from '@errors/AppErrors';

const { MEM_DB, MEM_DB_HOST, MEM_DB_PORT, MEM_DB_USER, MEM_DB_PASS } =
  process.env;

const memoryDatabaseClient = createClient({
  url: `${MEM_DB}://${MEM_DB_USER}:${MEM_DB_PASS}@${MEM_DB_HOST}:${MEM_DB_PORT}`,
});

const limiter = new RateLimiterRedis({
  storeClient: memoryDatabaseClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
