import "@testing-library/jest-dom";

// Suppress console errors in tests
global.console = {
  ...console,
  error: jest.fn(),
};
