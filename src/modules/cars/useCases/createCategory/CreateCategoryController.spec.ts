import request from 'supertest';

import app from '@shared/infra/http/app';
import { databaseClient } from '@shared/infra/http/database';
import { getSeededAdminUser, truncateTables } from '@utils/database';

describe('Create Category Controller', () => {
  jest.setTimeout(30000);

  let Authorization: object;

  beforeAll(async () => {
    const authentication = await request(app)
      .post('/sessions')
      .send(getSeededAdminUser());

    Authorization = {
      Authorization: `Bearer ${authentication.body.refresh_token}`,
    };
  });

  afterAll(async () => {
    await truncateTables(['categories']);
    await databaseClient.$disconnect();
  });

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Lorem ipsum dollor',
        description: 'Lorem ipsum dollor description',
      })
      .set(Authorization);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should reject the attempt to create a duplicated category', async () => {
    await request(app)
      .post('/categories')
      .send({
        name: 'Lorem category',
        description: 'Lorem category description',
      })
      .set(Authorization);

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Lorem category',
        description: 'Lorem category description',
      })
      .set(Authorization);

    expect(response.status).toBe(400);
  });
});
