// jest.config.ts
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import * as tsconfig from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.paths, {
    prefix: '<rootDir>/',
  }),
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

export default config;
