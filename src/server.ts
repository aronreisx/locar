import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDoc } from './config/swagger';

import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);

const port = 3333;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
