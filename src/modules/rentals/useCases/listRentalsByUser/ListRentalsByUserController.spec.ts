import request from 'supertest';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import app from '@shared/infra/http/app';
import { databaseClient } from '@shared/infra/http/database';
import { truncateTables, getSeededAdminUser } from '@utils/database';

describe('List Rentals By User Controller', () => {
  jest.setTimeout(30000);

  let dateProvider: DayjsDateProvider;
  let Authorization: object;

  beforeAll(async () => {
    dateProvider = new DayjsDateProvider();

    const authentication = await request(app)
      .post('/sessions')
      .send(getSeededAdminUser());

    Authorization = {
      Authorization: `Bearer ${authentication.body.refresh_token}`,
    };
  });

  afterAll(async () => {
    await truncateTables(['categories', 'cars', 'rentals']);
    await databaseClient.$disconnect();
  });

  it('should be able to list all rentals', async () => {
    const category = await databaseClient.category.create({
      data: {
        name: 'Lorem',
        description: 'Ipsum dollor apset',
      },
    });
    expect(category).toHaveProperty('id');

    const car = await databaseClient.car.create({
      data: {
        name: 'Ipsum',
        description: 'Lorem stylish car',
        daily_rate: 50,
        fine_amount: 123,
        license_plate: 'CHU-123122',
        brand: 'Dollor',
        category_id: category.id,
      },
    });
    expect(car).toHaveProperty('id');

    const rental = await request(app).post('/rentals').set(Authorization).send({
      expected_return_date: dateProvider.dateTomorrow(),
      start_date: dateProvider.dateNow(),
      car_id: car.id,
    });
    expect(rental.body).toHaveProperty('id');

    const response = await request(app).get('/rentals/user').set(Authorization);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].id).toEqual(rental.body.id);
  });
});
