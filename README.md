# Custom Netwrapper Utility

This package is essentially a network wrapper that helps developers around the world deliver consistent results when building frontend applications that connect to backend services. This package inspiration came from working in teams where frontend users could not achieve consistent results when integrating with APIs.## Table of Contents

- [Installation](____#installation____)
- [Getting Started](____#getting-started____)
  - [Basic Utilities](____#basic-utilities____)
  - [Exported Types](____#exported-types____)
- [NodeJS Netwrapper](____#nodejs-netwrapper____)
- [ReactJS Netwrapper](____#reactjs-netwrapper____)
- [Callbacks](____#callbacks____)
  - [`queryFn`](____#queryfn____)
  - [`onStartQuery`](____#onstartquery____)
  - [`onSuccess`](____#onsuccess____)
  - [`onError`](____#onerror____)
- [Utilities](____#utilities____)
  - [`logger`](____#logger____)
  - [`simulateDataCall`](____#simulate-data-call____)
- [Closing](____#closing____)

## Installation

To use the fetcher utility in your project, you need to install it first. You can do this by running the following command:

```bash
npm install netwrap
```

## Getting Started

Using this utility is meant to be very intuitive as all types, functions and private utilities are exported out of the package, however, there are a few specifics that are worth mentioning.

**\*\*\*\***\*\*\*\***\*\*\*\***Note:**\*\*\*\***\*\*\*\***\*\*\*\*** You can use this package on either a pure NodeJS project (Any framework built with NodeJs) or a ReactJS Project (All React frameworks included)

## Basic Utilities

1. `calledFunction` - This is a utility that helps identify what function name you just called it from.
2. `isReactAvailable` - This will help identify if your project is a react project or not
3. `logger` - This is a multipurpose logger that enables terminal logging for any and everything you want. Read more about how it works down [below](____#logger____).
4. `responseHandler` - This is just something i like to use to maintain consistency in returned values.
5. `simulateDataCall` - This helps simulate an ajax or http request that takes some time to complete. Read more about how it works down [below](____#simulate-data-call____).

## Exported Types

This package has most of its types exposed via named exports but as always you can create your own types using the exported functions alongside typescript [Utility Types](____https://www.typescriptlang.org/docs/handbook/utility-types.html____)

## NodeJS Netwrapper

For those aiming to use this package on a nodejs based application, here's the only function that you need to activate the netwrapper goodness. Here's how you use it:

```javascript
import { fetcher } from "netwrap";
```

Then in your project, you can just do this

```javascript
const { trigger, data, error, onLoadingChange } = fetcher({
  queryFn: async () => {
    _;
    _; //___ _This expects you to return a Promise with data__
  },
  onStartQuery: () => {
    _;
    _; //___ _This will fire before the query function executes__
  },
  onSuccess: (data) => {
    _;
    _; //___ _This will fire right after the query is successful__
  },
  onError: (error) => {
    _;
    _; //___ _This will fire if there is any error at all in the query function__
  },
  onFinal: () => {
    _;
    _; //___ _This will fire once the query function has finished execution__
  },
});
```

Now you might be wondering what `trigger, data, error, onLoadChange` do

Let me explain it this way

```javascript
const { trigger, data, error, onLoadChange } = fetcher({
   ...
})

__//___ _trigger - This is an asynchronous function to trigger the query function to run__
__//___ _data - This will hold the returned successful data after the query function runs__
__//___ _error - This will hold any error encountered__
__//___ _onLoadChange - This callback will fire whenever the loading state on query function updates__
```

But that's not all you should know

Callbacks on the fetcher function like `onStartQuery`, `onSuccess`, `onError` and `onFinal` are optional. What this means is you don't neccessarily need to use them. Only [`queryFn`](____#queryfn____) is mandatory.

So you can do

```javascript
const { trigger } = fetcher({
  queryFn: async () => {},
});

const data = await trigger();
__/**___ _the returned data will then look like this - {status: boolean, message: string; payload: any} *____*/__
const { status, message, payload } = await trigger();

__//___ _status - Whether the request was successful,__
__//___ _message - Description of what just happened__
__//___ _payload - The returned payload if the request was successful__
```

Great right? I think so too!

## Callbacks

### `queryFn`

```javascript
import {fetcher} from "netwrap"

fetcher({
    queryFn: async () => {
        __/**____
        __This is where you can manipulate data before your request runs__
        __*____*/__

        const url = "https://dummyjson.com/users";

                __//___ _You can throw errors here that you want caught by the onError callback__

        throw new Error() __//___ _Sends an error to the onError callback. This is optional__

        return axios.get(url); __//___ _Notice there is no await preceding this axios call. This is intentional.__
    },
    ...
});
```

### `onStartQuery`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onStartQuery: () => {
        __/**____
        __This runs just before the query function triggers and offers an opportunity for you to manually manage your loading state__
        __*____*/__

                __//___ _Any error here will not be caught by the onError callback. Instead it will propagate upwards__
    },
    ...
});
```

### `onSuccess`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onSuccess: (data) => {
        __/**____
        __This is where you get the data from a successfully query function run__
        __*____*/__
        logger(data)

                __//___ _You can throw errors here that you want caught by the onError callback__

        throw new Error() __//___ _Sends an error to the onError callback. This is optional__
    },
    ...
});
```

### `onError`

```javascript

import {logger, fetcher} from "netwrap"

fetcher({
    onError: (error) => {
        __/**____
        __This is where you get the error from a failed query function run__
        __*____*/__
        logger(error)

        __//___ _Throwing an error here will cascade to the top enclosing function to be handled__
    },
    ...
});
```

## ReactJS Netwrapper

So in order not to sound like a broken record, pretty much every [callback](____#callbacks____) for the NodeJS Netwrapper applies here also. The singular difference is this

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
       __//___ _same callbacks as nodejs netwrapper__
    })
}
```

### isLoading

On react, the loading state is set inside the query function and exposed for your usage. So when the function starts loading the state is set to true and when it is done loading, it is set to false.

As far the utilities and the documentation for them, their documentation will be hosted on this site \***\*\*\*\***\*\***\*[**\*\*\*\*\***\*Metrobuzz\*\***\*\*\***\*](**\_\_\*\***https://metrobuzz.com.ng****\_\_**)\*\***\*\***\*\*\*\***

## Utilities

### Logger

This utility helps beautify logs by using colors to determine what types of logs you are getting.

#### How it works

```javascript
import { logger } from "netwrap";

logger("Hello");

// Works like console.log
// Output
<span style="color: green; font-weight: bold;">Netwrap Log:</span>  "Hello"
```

Does it have options? Ofcourse it does!

```javascript
import { logger } from "netwrap";

logger("Hello", {
  shouldLog: false,
});

// Output
<span style="color: gray; font-weight: bold;">Netwrap Log:</span>  Logging is disabled
```

```javascript
import { logger } from "netwrap";

logger("Hello", {
  isError: true,
});

// Output
// Netwrap Log: Hello
<span style="color: red; font-weight: bold;">Netwrap Log:</span> Hello
```

```javascript
import { logger } from "netwrap";

logger("Hello", {
  shouldLog: true,
});

// Output
// Netwrap Log: Hello
<span style="color: green; font-weight: bold;">Netwrap Log:</span> Hello
```

### Simulate Data Call

## Closing

Happy coding! If you have any questions or feedback, please feel free to reach out to us. We're here to help!

Created by [@tylerdgenius](______https://github.com/tylerdgenius______)
