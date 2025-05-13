// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|webp|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js',
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testMatch: [
    '<rootDir>/src/test/components/**/*.(test|spec).(ts|tsx)',
    '<rootDir>/src/test/pages/**/*.(test|spec).(ts|tsx)'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/integration/setupTests.ts'
  ],
  transformIgnorePatterns: ['/node_modules/']
};
