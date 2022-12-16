import request from 'supertest';

import app from '@shared/infra/http/app';
import { databaseClient } from '@shared/infra/http/database';
import { truncateTables, getSeededAdminUser } from '@utils/database';

describe('List Categories Controller', () => {
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

  it('should be able to list all categories', async () => {
    const previousCategoriesList = await request(app).get('/categories');

    await databaseClient.category.create({
      data: {
        name: 'Ipsum category',
        description: 'Ipsum category description',
      },
    });

    const currentCategoryList = await request(app).get('/categories');

    expect(currentCategoryList.status).toBe(200);
    expect(currentCategoryList.body[0]).toHaveProperty('id');
    expect(currentCategoryList.body.length).toBeGreaterThan(
      previousCategoriesList.body.length
    );
  });
});
