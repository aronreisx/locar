import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/prisma/repositories/CategoriesRepository';

import { SpecificationsRepository } from '@modules/cars/infra/prisma/repositories/SpecificationRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
