import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  collectCoverages: true,
  collectCoverageFrom: ['<rootDir/src/modules/**/useCases/**/*.ts>'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};
