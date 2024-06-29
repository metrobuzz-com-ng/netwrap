export * from "./utils/calledFunction";
export * from "./utils/responseHandler";
export * from "./utils/simulateDataCall";
export * from "./types";

import { functionGenerator, useFunctionGenerator } from "./functionGenerator";
import { useFetcher } from "./fetcher";

// For Node.js modules
if (typeof global !== "undefined") {
  (global as any).netwrap = {
    functionGenerator: functionGenerator,
    useFunctionGenerator: undefined,
  };
}

// For Browser modules
if (typeof window !== "undefined" && typeof window.netwrap === "undefined") {
  (window as any).netwrap = {
    useFunctionGenerator: useFunctionGenerator,
    functionGenerator: functionGenerator,
  };
}

export { functionGenerator, useFunctionGenerator, useFetcher };
