import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from '@modules/accounts/models/User';
import app from '@shared/infra/http/app';
import { DatabaseClient, IDatabaseClient } from '@shared/infra/http/database';
import { DatabaseUtils } from '@utils/database';

let databaseClient: IDatabaseClient;
let databaseUtils: DatabaseUtils;

const adminUser: IUser = {
  id: uuidv4(),
  name: 'Jose Waldo',
  email: 'jose.waldo@contact.co.uk',
  password: '51312212',
  driver_license: 'HGX142WB',
  avatar: '',
  admin: true,
};

describe('Create Category Controller', () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    databaseClient = new DatabaseClient();
    databaseUtils = new DatabaseUtils(databaseClient);
    await databaseUtils.createUser(adminUser);
  });

  afterAll(async () => {
    await databaseClient.$transaction([
      databaseClient.user.deleteMany(),
      databaseClient.category.deleteMany(),
    ]);
    await databaseUtils.disconnect();
  });

  it('should be able to create a new category', async () => {
    const authentication = await request(app).post('/sessions').send({
      email: adminUser.email,
      password: adminUser.password,
    });

    const { token } = authentication.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Supertest category',
        description: 'Supertest category description',
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });

  it('should reject the attempt to create a category that already exists', async () => {
    const authentication = await request(app).post('/sessions').send({
      email: adminUser.email,
      password: adminUser.password,
    });

    const { token } = authentication.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Supertest category',
        description: 'Supertest category description',
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(400);
  });
});