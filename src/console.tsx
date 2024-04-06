import chalk from "chalk";

export const log = (
  data: any,
  shouldLog: boolean = true,
  isError: boolean = false
) => {
  const logger = console[isError ? "error" : "log"];

  if (shouldLog === true) {
    return logger(chalk.green("Log:", data));
  }

  return logger(chalk.green("Log:", "Logging is disabled"));
};

export const useConsole = () => {
  return {
    log,
  };
};

log("Testing");
