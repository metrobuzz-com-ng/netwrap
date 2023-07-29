// Import the necessary modules and types
import React from "react";
import axios from "axios";
import { simulateDataCall, useFunctionGenerator } from "../src";

const mockedData = {
  data: "mocked data",
};

// Mock axios request implementation
jest.mock("axios", () => ({
  request: jest.fn(() => Promise.resolve(mockedData)),
}));

jest.mock("../src/simulateDataCall", () => ({
  simulateDataCall: jest.fn(() => Promise.resolve(mockedData)),
}));

// Mock fetch request implementation
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "mocked data" }),
    }) as Promise<Response>
);

// Test the useFunctionGenerator utility
describe("useFunctionGenerator", () => {
  // Test case for "axios" dataCallerType
  it('should handle "axios" dataCallerType', async () => {
    // Call the hook generator
    const { functions } = useFunctionGenerator({
      name: "TestHook",
      dataCallerType: "axios",
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });

    // Call the main function
    const data = await functions.takeAction();

    // Assert that axios.request is called with the correct parameters
    expect(axios.request).toHaveBeenCalledWith({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });

    expect(data).toStrictEqual({
      status: true,
      message: "Successfully gotten returned data",
      payload: mockedData,
    });
  });

  // Test case for "simulate" dataCallerType
  it('should handle "simulate" dataCallerType', async () => {
    // Call the hook generator
    const { functions } = useFunctionGenerator({
      name: "TestHook",
      dataCallerType: "simulate",
      mockData: mockedData,
      dataDelay: 1000,
    });

    // Call the main function
    const data = await functions.takeAction();

    // Assert that successHandler is called with the correct parameters
    expect(simulateDataCall).toHaveBeenCalledWith(1000, mockedData);

    expect(data).toStrictEqual({
      status: true,
      message: "Successfully gotten returned data",
      payload: mockedData,
    });
  });

  it('should handle "custom" dataCallerType', async () => {
    // Call the hook generator
    const { functions } = useFunctionGenerator({
      name: "TestHook",
      dataCallerType: "custom",
      dataCaller: async () => {
        const data = axios.request({
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "get",
        });

        return data;
      },
    });

    // Call the main function
    const data = await functions.takeAction();

    expect(axios.request).toHaveBeenCalledWith({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });

    expect(data).toStrictEqual({
      status: true,
      message: "Successfully gotten returned data",
      payload: mockedData,
    });
  });

  it('should handle "fetch" dataCallerType', async () => {
    // Call the hook generator
    const { functions } = useFunctionGenerator({
      name: "TestHook",
      dataCallerType: "fetch",
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });

    // Call the main function
    const data = await functions.takeAction();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      { body: undefined, headers: undefined, method: "get", signal: undefined }
    );

    expect(data).toStrictEqual({
      status: true,
      message: "Successfully gotten returned data",
      payload: mockedData,
    });
  });
});
