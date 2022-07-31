import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};
