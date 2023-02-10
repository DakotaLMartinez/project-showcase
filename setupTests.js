import '@testing-library/jest-dom'

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import { server } from "./src/mocks/server.js";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterAll(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
