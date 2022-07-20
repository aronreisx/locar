import dotenv from 'dotenv';
import dotenvExpander from 'dotenv-expand';

import 'reflect-metadata';
import '@shared/container';

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { swaggerDoc } from '@config/swagger';
import { errorHandler } from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';

dotenvExpander.expand(dotenv.config());

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);
app.use(errorHandler);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
