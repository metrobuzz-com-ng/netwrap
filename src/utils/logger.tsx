import { Logger } from "../types";

const logger: Logger = (data, options) => {
  let shouldLog = true;
  let isError = false;

  if (options && options.shouldLog) {
    shouldLog = options.shouldLog;
  }

  if (options && options.isError) {
    isError = options.isError;
  }

  if (shouldLog) {
    if (isError) {
      console.error("%cNetwrap Error:", "color: red; font-weight: bold;", data);
    } else {
      console.log("%cNetwrap Log:", "color: green; font-weight: bold;", data);
    }
  } else {
    console.log(
      "%cNetwrap Log:",
      "color: gray; font-weight: bold;",
      "Logging is disabled"
    );
  }
};

export default logger;
