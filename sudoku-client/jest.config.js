module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
    coveragePathIgnorePatterns: [
    'public', 'node_modules'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov'],
    testMatch: ['**/tests/**/*.test.js'],
    testPathIgnorePatterns: ['mocks'],
    moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
    'typeface-roboto': '<rootDir>/tests/__mocks__/styleMock.js'
    },
    setupFiles: ['<rootDir>/tests/jestSetup.js']
    
    };