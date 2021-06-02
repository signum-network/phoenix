// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  moduleNameMapper: {
    '@signumjs/core': '<rootDir>../../lib/packages/core',
    '@signumjs/crypto': '<rootDir>../../lib/packages/crypto',
    '@signumjs/util': '<rootDir>../../lib/packages/util',
    '@signumjs/http': '<rootDir>../../lib/packages/http',
    '@fuse': '<rootDir>/src'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!(jest-test))']
};
