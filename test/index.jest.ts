// Import the necessary modules and types
import axios from "axios";
import {
  useFunctionGenerator,
  DataCallerType,
  HookGenerator,
  simulateDataCall,
  successHandler,
} from "../src";

// Define a mock implementation for the successHandler and errorHandler functions
jest.mock("./successHandler", () => ({
  successHandler: jest.fn(),
}));

jest.mock("./errorHandler", () => ({
  errorHandler: jest.fn(),
}));

// Test the useFunctionGenerator utility
describe("useFunctionGenerator", () => {
  // Test case for "axios" dataCallerType
  it('should handle "axios" dataCallerType', async () => {
    // Mock axios request implementation
    jest.mock("axios", () => ({
      request: jest.fn().mockResolvedValue({ data: "Mocked Axios Data" }),
    }));

    // Define the input for the hook generator
    const inputData: HookGenerator<DataCallerType> = {
      name: "TestHook",
      dataCallerType: "axios",
    };

    // Call the hook generator
    const { functions } = useFunctionGenerator(inputData);

    // Call the main function
    await functions.useTestHook();

    // Assert that axios.request is called with the correct parameters
    expect(axios.request).toHaveBeenCalledWith({
      method: "get",
      url: "https://example.com/api",
    });

    // Assert that successHandler is called with the correct parameters
    expect(successHandler).toHaveBeenCalledWith({
      message: "Successfully gotten returned data",
      payload: "Mocked Axios Data",
    });
  });

  // Test case for "simulate" dataCallerType
  it('should handle "simulate" dataCallerType', async () => {
    // Define the input for the hook generator
    const inputData: HookGenerator<DataCallerType> = {
      name: "TestHook",
      dataCallerType: "simulate",
      mockData: "Mocked Simulated Data",
      dataDelay: 1000,
    };

    // Call the hook generator
    const { functions } = useFunctionGenerator(inputData);

    // Call the main function
    await functions.useTestHook();

    // Simulate the data call and wait for the delay
    await simulateDataCall(1000, "Mocked Simulated Data");

    // Assert that successHandler is called with the correct parameters
    expect(successHandler).toHaveBeenCalledWith({
      message: "Successfully gotten returned data",
      payload: "Mocked Simulated Data",
    });
  });

  // Add more test cases for other dataCallerTypes and edge cases as needed
});
