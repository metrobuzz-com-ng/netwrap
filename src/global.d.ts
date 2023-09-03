import { functionGenerator, useFunctionGenerator } from "./functionGenerator";

declare global {
  interface Global {
    netwrap: {
      functionGenerator: typeof functionGenerator;
      useFunctionGenerator?: typeof useFunctionGenerator;
    };
  }
  interface Window {
    netwrap: {
      useFunctionGenerator?: typeof useFunctionGenerator;
      functionGenerator: typeof functionGenerator;
    };
  }
}
