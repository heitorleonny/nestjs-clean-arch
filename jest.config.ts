const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  rootDir: './',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: [5098],
        },
        tsconfig: {
          ...compilerOptions,
          module: 'ES2022',
          moduleResolution: 'Bundler',
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!@faker-js/faker/)'],
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
}
