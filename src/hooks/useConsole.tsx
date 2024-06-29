import utils from "../utils";

if (!utils.isReactAvailable()) {
  utils.logger("useConsole can only be used in React based projects", {
    isError: true,
  });

  throw new Error();
}

const useConsole = () => {
  return {
    log: utils.logger,
  };
};

export default useConsole;
