export const log = (data: any, shouldLog?: boolean, hideLogs = false) => {
  if (typeof shouldLog === "undefined" || shouldLog === true) {
    return console.log(data);
  }

  if (shouldLog === false) {
    !hideLogs && console.log("Logging is disabled");
  }
};

export const useConsole = () => {
  return {
    log,
  };
};
