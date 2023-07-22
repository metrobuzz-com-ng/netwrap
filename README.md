Custom Netwrapper Utility
============================

The Custom Netwrapper Utility is a powerful tool designed to simplify the process of creating custom React hooks for handling different types of data calls, including Axios and Fetch requests, custom data callers, and simulated data calls. This utility allows you to generate hooks with ease, providing consistent patterns and error handling, making your data fetching code cleaner and more organized.

Installation
------------

To use the Custom Hook Generator Utility in your project, you need to install it first. You can do this by running the following command:

npm install netwrap

Getting Started
---------------

To create a custom hook using the utility, you need to import the `useHookGenerator` function from the package and define the necessary configurations for your data call. The following steps demonstrate how to use the utility to create a custom hook:

1. Import the necessary modules and functions:

```javascript
import { functionGenerator, successHandler, errorHandler } from "netwrap";

const hookConfig = {
  name: "myDataHook", // Specify a name for your hook
  dataCallerType: "axios", // Choose the type of data call ("axios", "fetch", "custom", or "simulate")

  /** All other props below are optional depending on the selected data caller type */

  method: "get", // Specify the HTTP method (used for Axios and Fetch calls)
  url: "https://api.example.com/data", // Specify the URL (used for Axios and Fetch calls)
  requestData: { key: "value" }, // Specify any data to be sent in the request body (used for Axios and Fetch calls)
  signal: undefined, // Specify the AbortSignal object for canceling requests (used for Fetch calls)
  headers: { "Content-Type": "application/json" }, // Specify HTTP headers (used for Fetch calls)
  onUploadProgress: undefined, // Specify the upload progress handler (used for Axios calls)
  dataCaller: undefined, // Specify a custom data caller function (used for "custom" data calls). It is technically a function that allows you to define your own data caller. Just make sure that you return the data you want exported from your function
  mockData: { id: 1, name: "John Doe", age: 30 }, // Specify the mock data for simulated data calls
};

const useMyDataHook = functionGenerator(hookConfig); // The name of your hook can be anything you want

function MyComponent() {
  const { functions, loaders } = useMyDataHook();

  const fetchData = async () => {
    try {
      const result = await functions.useMyDataHook(); // Call the generated hook function
      console.log("Data received:", result.payload);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      {loaders.isLoading ? <p>Loading...</p> : <button onClick={fetchData}>Fetch Data</button>}
    </div>
  );
}

```

Configuration Options
------------

The function generator utility supports various configuration options to suit different data call scenarios:

1. name: The name of the custom hook to be generated (string).
2. dataCallerType: The type of data call to be made ("axios", "fetch", "custom", or "simulate").
3. method: The HTTP method for Axios and Fetch calls (string, optional).
4. url: The URL for Axios and Fetch calls (string, optional).
requestData: Data to be sent in the request body for Axios and Fetch calls (object, optional).
5. signal: The AbortSignal object for canceling Fetch requests (AbortSignal, optional).
6. headers: HTTP headers for Fetch calls (object, optional).
7. onUploadProgress: The upload progress handler for Axios calls (function, optional).
8. dataCaller: The custom data caller function for "custom" data calls (function, optional).
9. mockData: The mock data for simulated data calls (any, optional).

Advisory for dataCaller Prop
------------

When using the dataCaller prop, please ensure that you define the function to return something. The dataCaller function must return a value as it is enforced for dataCallerType set to "custom." If the dataCaller function doesn't return anything, it may result in errors or unexpected behavior in your custom hook.

For other dataCallerType options like "axios", "fetch", or "simulate", the dataCaller prop is not allowed, and you can use other appropriate parameters for data calling.

```javascript

import { useFunctionGenerator } from "netwrap";

const MyCustomComponent = () => {
  // Define parameters
  const name = "myCustomHook";
  const dataCallerType = "custom"; // Choose from "axios", "fetch", "custom", or "simulate"

  // Define your dataCaller function
  const dataCaller =  async () => {
    // Your data calling logic here
    // Must return something as it's enforced for "custom" dataCallerType
  };

  // Call the hook generator
  const { functions, loaders } = useFunctionGenerator({
    name,
    dataCallerType,
    dataCaller, // Pass your dataCaller function here
    // Other optional parameters as needed
  });

  // Use the generated functions and loaders as needed
  const handleGetData = async () => {
    try {
      const result = await functions.useMyCustomHook(); // The name of the returned hook is determined by the name passed in the function generator
      console.log("Data:", result.payload);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Your JSX code here */}
      <button onClick={handleGetData}>Get Data</button>
      {loaders.isLoading && <p>Loading...</p>}
    </div>
  );
};


```

Advisory for `simulate` DataCallerType
------------

When using the `simulate` dataCallerType, you can simulate a data call without making an actual API request. This can be useful during development and testing to check how your application behaves with different data scenarios. However, it's important to note the following:

1. **Providing Mock Data**: When using the `simulate` dataCallerType, you must provide mock data to be used for the simulation. The `mockData` parameter is required, and it should be of the appropriate data type that your custom hook expects.

2. **Simulating Delay**: The hook generator will simulate a delay of 5000ms (5 seconds) by default using the `simulateDataCall` function. This delay allows you to observe loading states and asynchronous behavior in your application. You can modify the delay duration if needed by passing a different time in milliseconds as an argument `dataDelay` to the function generator.

3. **Mock Data Structure**: Ensure that the structure of the provided mock data matches the expected data structure in your custom hook. Mismatched data structures may lead to errors or unexpected behavior in your application.

Here's an example of how to use the `simulate` dataCallerType:

```javascript
const MyCustomHook = () => {
  // Define parameters
  const name = "myCustomHook";
  const dataCallerType = "simulate"; // Use "simulate" for simulating data

  // Define your mock data
  const mockData = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  };

  // Call the hook generator with "simulate" dataCallerType and mock data
  const { functions, loaders } = useFunctionGenerator({
    name,
    dataCallerType,
    mockData, // Provide the mock data here
    // Other optional parameters as needed
  });

  // Use the generated functions and loaders as needed
  const handleGetData = async () => {
    try {
      const result = await functions.useMyCustomHook();
      console.log("Data:", result.payload);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Your JSX code here */}
      <button onClick={handleGetData}>Get Simulated Data</button>
      {loaders.isLoading && <p>Loading...</p>}
    </div>
  );
};

```

Error Handling
------------

The utility includes built-in error handling that provides useful error messages and locations in case of data retrieval failures. It integrates with your custom error handler function (e.g., errorHandler) to deliver detailed error reports.

With the Custom Function Generator Utility, you can easily create custom hooks/functions to handle various data calls without the need for redundant boilerplate code. This utility streamlines your data fetching process, making it more organized and efficient.

Happy coding! If you have any questions or feedback, please feel free to reach out to us. We're here to help!

Created by [@tylerdgenius](https://github.com/tylerdgenius)