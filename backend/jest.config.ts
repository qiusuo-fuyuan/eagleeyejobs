// jest.config.ts
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import * as tsconfig from './tsconfig.json';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

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

dotenv.config({ path: `config/env.${process.env.NODE_ENV}` })

export default config;
