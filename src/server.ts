import dotenv from 'dotenv'
import dotenvExpander from 'dotenv-expand';
dotenvExpander.expand(dotenv.config());

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDoc } from './config/swagger';

import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
