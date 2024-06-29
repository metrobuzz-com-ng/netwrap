import errorHandler from "./errorHandler";
import isReactAvailable from "./isReactAvailable";
import logger from "./logger";
import responseHandler from "./responseHandler";
import simulateDataCall from "./simulateDataCall";
import calledFunction from "./calledFunction";

export default {
  log: logger,
  isReactAvailable,
  errorHandler,
  responseHandler,
  simulateDataCall,
  calledFunction,
};
