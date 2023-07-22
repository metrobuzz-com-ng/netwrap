// jest.config.js

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    // Add any custom module mappings if needed
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
