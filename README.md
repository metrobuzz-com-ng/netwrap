# Custom Netwrapper Utility

This package is essentially a network wrapper that helps developers around the world deliver consistent results when building frontend applications that connect to backend services. This package inspiration came from working in teams where frontend users could not achieve consistent results when integrating with APIs.## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Basic Utilities](#basic-utilities)
  - [Exported Types](#exported-types)
- [NodeJS Netwrapper](#nodejs-netwrapper)
- [ReactJS Netwrapper](#reactjs-netwrapper)
- [Callbacks](#callbacks)
  - [`queryFn`](#queryfn)
  - [`onStartQuery`](#onstartquery)
  - [`onSuccess`](#onsuccess)
  - [`onError`](#onerror)
- [Utilities](#utilities)
  - [`calledFunction`](#calledfunction)
  - [`isReactAvailable`](#isreactavailable)
  - [`logger`](#logger)
  - [`responseHandler`](#responsehandler)
  - [`simulateDataCall`](#simulatedatacall)

## Installation

To use the fetcher utility in your project, you need to install it first. You can do this by running the following command:

```bash
npm install netwrap
```

## Getting Started

Using this utility is meant to be very intuitive as all types, functions and private utilities are exported out of the package, however, there are a few specifics that are worth mentioning.

**Note:** You can use this package on either a pure NodeJS project (Any framework built with NodeJs) or a ReactJS Project (All React frameworks included)

## Basic Utilities

1. `calledFunction` - This is a utility that helps identify what function name you just called it from.
2. `isReactAvailable` - This will help identify if your project is a react project or not
3. `logger` - This is a multipurpose logger that enables terminal logging for any and everything you want. Read more about how it works down [below](#Logger).
4. `responseHandler` - This is just something i like to use to maintain consistency in returned values.
5. `simulateDataCall` - This helps simulate an ajax or http request that takes some time to complete. Read more about how it works down [below](#SimulateDataCall).

## Exported Types

This package has most of its types exposed via named exports but as always you can create your own types using the exported functions alongside typescript [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## NodeJS Netwrapper

For those aiming to use this package on a nodejs based application, here's the only function that you need to activate the netwrapper goodness. Here's how you use it:

```javascript
import { fetcher } from "netwrap";
```

Then in your project, you can just do this

```javascript
const { trigger, data, error, onLoadingChange } = fetcher({
  queryFn: async () => {
    // This expects you to return a Promise with data
  },
  onStartQuery: () => {
    // This will fire before the query function executes
  },
  onSuccess: (data) => {
    // This will fire right after the query is successful
  },
  onError: (error) => {
    // This will fire if there is any error at all in the query function
  },
  onFinal: () => {
    // This will fire once the query function has finished execution
  },
});
```

Now you might be wondering what `trigger, data, error, onLoadChange` do

Let me explain it this way

```javascript
const { trigger, data, error, onLoadChange } = fetcher({
   ...
})

// trigger - This is an asynchronous function to trigger the query function to run
// data - This will hold the returned successful data after the query function runs
// error - This will hold any error encountered
// onLoadChange - This callback will fire whenever the loading state on query function updates
```

But that's not all you should know

Callbacks on the fetcher function like `onStartQuery`, `onSuccess`, `onError` and `onFinal` are optional. What this means is you don't neccessarily need to use them. Only [`queryFn`](#```queryFn```) is mandatory.

So you can do

```javascript
const { trigger } = fetcher({
  queryFn: async () => {},
});

const data = await trigger();
/** the returned data will then look like this - {status: boolean, message: string; payload: any} **/
const { status, message, payload } = await trigger();

// status - Whether the request was successful,
// message - Description of what just happened
// payload - The returned payload if the request was successful
```

Great right? I think so too!

## Callbacks

### `queryFn`

```javascript
import {fetcher} from "netwrap"

fetcher({
    queryFn: async () => {
        /**
        This is where you can manipulate data before your request runs
        **/

        const url = "https://dummyjson.com/users";

                // You can throw errors here that you want caught by the onError callback

        throw new Error() // Sends an error to the onError callback. This is optional

        return axios.get(url); // Notice there is no await preceding this axios call. This is intentional.
    },
    ...
});
```

### `onStartQuery`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onStartQuery: () => {
        /**
        This runs just before the query function triggers and offers an opportunity for you to manually manage your loading state
        **/

                // Any error here will not be caught by the onError callback. Instead it will propagate upwards
    },
    ...
});
```

### `onSuccess`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onSuccess: (data) => {
        /**
        This is where you get the data from a successfully query function run
        **/
        logger(data)

                // You can throw errors here that you want caught by the onError callback

        throw new Error() // Sends an error to the onError callback. This is optional
    },
    ...
});
```

### `onError`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onError: (error) => {
        /**
        This is where you get the error from a failed query function run
        **/
        logger(error)

        // Throwing an error here will cascade to the top enclosing function to be handled
    },
    ...
});
```

## ReactJS Netwrapper

So in order not to sound like a broken record, pretty much every callback for the NodeJS Netwrapper applies here also. The singular difference is this

#### Imports

```javascript
import { useFetcher } from "netwrap";
```

#### Usage

```javascript
const App = () => {
 .  const {
      trigger, isLoading, data, error
    } = useFetcher({
       // same callbacks as nodejs netwrapper
    })
 }
```

### isLoading

On react, the loading state is set inside the query function and exposed for your usage. So when the function starts loading the state is set to true and when it is done loading, it is set to false.

As far the utilities and the documentation for them, their documentation will be hosted on this site **[Metrobuzz](https://metrobuzz.com.ng)**

Happy coding! If you have any questions or feedback, please feel free to reach out to us. We're here to help!

Created by [@tylerdgenius](__https://github.com/tylerdgenius__)
