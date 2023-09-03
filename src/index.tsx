export * from "./console";
export * from "./errorCallerFunction";
export * from "./responseHandler";
export * from "./simulateDataCall";
export * from "./types";

import { functionGenerator, useFunctionGenerator } from "./functionGenerator";

declare global {
  interface Window {
    netwrap: {
      useFunctionGenerator?: typeof useFunctionGenerator;
      functionGenerator: typeof functionGenerator;
    };
  }

  namespace NodeJS {
    interface Global {
      netwrap: {
        useFunctionGenerator?: typeof useFunctionGenerator;
        functionGenerator: typeof functionGenerator;
      };
    }
  }
}

// For Node.js modules
if (typeof global !== "undefined" && typeof global.netwrap === "undefined") {
  global.netwrap = {
    functionGenerator,
    useFunctionGenerator: undefined,
  };
}

// For Browser modules
if (typeof window !== "undefined" && typeof window.netwrap === "undefined") {
  window.netwrap = {
    useFunctionGenerator,
    functionGenerator,
  };
}

export { functionGenerator, useFunctionGenerator };
