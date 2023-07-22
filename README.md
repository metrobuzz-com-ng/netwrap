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

Error Handling
------------

The utility includes built-in error handling that provides useful error messages and locations in case of data retrieval failures. It integrates with your custom error handler function (e.g., errorHandler) to deliver detailed error reports.

With the Custom Function Generator Utility, you can easily create custom hooks/functions to handle various data calls without the need for redundant boilerplate code. This utility streamlines your data fetching process, making it more organized and efficient.

Happy coding! If you have any questions or feedback, please feel free to reach out to us. We're here to help!

Created by [@tylerdgenius](https://github.com/tylerdgenius)