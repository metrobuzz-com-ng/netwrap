import { ReactElement } from "react";

// Mock implementation for useState
const mockState = <T,>(initial: T): [T, jest.Mock<void, [T]>] => [
  initial,
  jest.fn(),
];
export const useState = jest.fn(mockState);

// Other React methods can also be mocked if needed
export const useEffect = jest.fn();

// Export the mocked React
export default {
  ...jest.requireActual("react"),
  useState,
  useEffect,
};
