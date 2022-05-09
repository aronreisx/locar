import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDoc } from './config/swagger';

import { router } from './routes';

import "./database";

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
