export * from "./errorCallerFunction";
export * from "./responseHandler";
export * from "./simulateDataCall";
export * from "./types";
export * from "./console";

import { useFunctionGenerator, functionGenerator } from "./functionGenerator";

declare global {
  var netwrap: {
    useFunctionGenerator?: typeof useFunctionGenerator;
    functionGenerator: typeof functionGenerator;
  }; // Update global types
}

// For Nodejs modules
if (typeof global.netwrap === "undefined") {
  // Merge netwrap to the global object
  global.netwrap = {
    functionGenerator,
    useFunctionGenerator: undefined,
  };
}

// For Browser modules
if (typeof window.netwrap === "undefined") {
  // Merge netwrap to the window object
  window.netwrap = {
    useFunctionGenerator,
    functionGenerator,
  };
}

export { useFunctionGenerator, functionGenerator };
