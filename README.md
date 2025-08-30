# Netwrap

A lightweight, flexible network wrapper for consistent API integration in both React and Node.js applications.

[![npm version](https://img.shields.io/npm/v/netwrap.svg)](https://www.npmjs.com/package/netwrap)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview

Netwrap helps development teams deliver consistent results when integrating frontend applications with backend services. Born from real-world challenges in team environments where frontend developers struggled to achieve consistent API integration patterns.

## Table of Contents

- [Installation](#installation)
- [Key Features](#key-features)
- [Usage](#usage)
  - [In Node.js](#in-nodejs)
  - [In React](#in-react)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Callbacks](#callbacks)
  - [Utilities](#utilities)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install netwrap
# or
yarn add netwrap
```

## Key Features

- **Unified API:** Consistent pattern for making network requests across projects
- **React Ready:** Built-in React hooks for easy integration
- **Node.js Compatible:** Works in any Node.js environment
- **TypeScript Support:** Fully typed API for better development experience
- **Error Handling:** Robust error handling with customizable callbacks
- **Loading States:** Simple loading state management, especially useful in React
- **Developer Utilities:** Helpful logging and testing utilities

## Usage

### In Node.js

```javascript
import { fetcher } from "netwrap";

const { trigger, data, error, onLoadingChange } = fetcher({
  queryFn: async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  },
  onSuccess: (data) => {
    console.log('Request successful:', data);
  },
  onError: (error) => {
    console.error('Request failed:', error);
  }
});

// Execute the request
const result = await trigger();
console.log(result); // { status: boolean, message: string, payload: any }
```

### In React

```javascript
import { useFetcher } from "netwrap";

function UserProfile({ userId }) {
  const { trigger, data, error, isLoading } = useFetcher({
    queryFn: async () => {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      return response.json();
    }
  });

  // Load data on component mount
  useEffect(() => {
    trigger();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return (
    <div>
      {data && <h1>{data.name}</h1>}
    </div>
  );
}
```

## API Reference

### Core Functions

#### `fetcher(options)`

Creates a network request handler for Node.js environments.

**Returns:**
- `trigger`: Function to execute the request
- `data`: The response data (if successful)
- `error`: Any error that occurred
- `onLoadingChange`: Callback registration for loading state changes

#### `useFetcher(options)`

React hook version of the fetcher.

**Returns:**
- `trigger`: Function to execute the request
- `data`: The response data (if successful)
- `error`: Any error that occurred
- `isLoading`: Boolean indicating if the request is in progress

### Callbacks

Both `fetcher` and `useFetcher` accept these callback options:

- **`queryFn`**: (Required) The async function that performs the actual request
- **`onStartQuery`**: Called before the request begins
- **`onSuccess`**: Called when the request succeeds, receives the response data
- **`onError`**: Called when an error occurs, receives the error object
- **`onFinal`**: Called when the request completes (success or error)

### Utilities

#### `logger(message, options)`

Colorful console logging utility.

```javascript
import { logger } from "netwrap";

// Regular log (green)
logger("Request completed");

// Error log (red)
logger("Request failed", { isError: true });

// Disable logging
logger("Debug info", { shouldLog: false });
```

#### `simulateDataCall(delay, mockData)`

Simulates an API call with a delay, useful for testing.

```javascript
import { simulateDataCall } from "netwrap";

// Simulates a 2-second API call
const data = await simulateDataCall(2000, { user: "John Doe" });
```

#### Other Utilities

- **`calledFunction`**: Helps identify the calling function name
- **`isReactAvailable`**: Checks if React is available in the environment
- **`responseHandler`**: Standardizes response format

## TypeScript Support

Netwrap is built with TypeScript and exports all necessary types for full type safety:

```typescript
import { useFetcher } from "netwrap";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserError {
  code: string;
  message: string;
}

const { trigger, data, error, isLoading } = useFetcher<void, User, UserError>({
  queryFn: async () => {
    // Type-safe implementation
  }
});
```

## Examples

### Basic Data Fetching

```javascript
const { trigger } = fetcher({
  queryFn: async () => {
    return fetch('https://api.example.com/data').then(res => res.json());
  }
});

const { status, message, payload } = await trigger();
```

### Request with Parameters

```javascript
const { trigger } = fetcher({
  queryFn: async (id) => {
    return fetch(`https://api.example.com/items/${id}`).then(res => res.json());
  }
});

const result = await trigger(123); // Pass parameter to request
```

### Loading State Management in React

```javascript
function DataComponent() {
  const { trigger, isLoading, data } = useFetcher({
    queryFn: async () => {
      return fetch('https://api.example.com/data').then(res => res.json());
    }
  });

  useEffect(() => {
    trigger();
  }, []);

  return (
    <div>
      {isLoading ? 'Loading...' : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

ISC © [@metrobuzz/tylerdgenius](https://github.com/tylerdgenius)
