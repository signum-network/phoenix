// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  moduleNameMapper: {
    '@burstjs/core': '<rootDir>../../lib/packages/core',
    '@burstjs/crypto': '<rootDir>../../lib/packages/crypto',
    '@burstjs/util': '<rootDir>../../lib/packages/util',
    '@burstjs/http': '<rootDir>../../lib/packages/http'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!(jest-test))']
};
