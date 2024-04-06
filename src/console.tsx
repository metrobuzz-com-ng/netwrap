import chalk from "chalk";

export const log = (
  data: any,
  shouldLog: boolean = true,
  isError: boolean = false
) => {
  const logger = console[isError ? "error" : "log"];
  const coloredChalk = chalk[isError ? "red" : "green"];

  if (shouldLog === true) {
    return logger(coloredChalk("Log:", data));
  }

  return logger(coloredChalk("Log:", "Logging is disabled"));
};

export const useConsole = () => {
  return {
    log,
  };
};

log("Testing");
