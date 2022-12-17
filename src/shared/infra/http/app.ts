import dotenv from 'dotenv';
import dotenvExpander from 'dotenv-expand';
import 'reflect-metadata';
import '@shared/container';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { swaggerDoc } from '@config/swagger';
import upload from '@config/upload';
import { errorHandler } from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';
import cors from 'cors';

dotenvExpander.expand(dotenv.config());

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
