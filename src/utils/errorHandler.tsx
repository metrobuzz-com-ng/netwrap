import responseHandler from "./responseHandler";
import { ErrorHandler } from "../types";
import logger from "./logger";

const errorHandler: ErrorHandler = ({
  error,
  dataCallerType,
  location = "An error occurred in the errorHandler function",
  mockData,
}) => {
  logger({ error, dataCallerType, location });

  const error_ = error as Error;

  const getErrorInstance = () => error_ instanceof Error;

  if (!error_ || !getErrorInstance()) {
    logger({ error, dataCallerType, location });

    return responseHandler({
      message: "Not an error instance",
      payload: { mockData, error },
      status: false,
    });
  }

  const axiosStyleError =
    dataCallerType === "axios"
      ? (error_ as typeof error_ & { response: { data: any } })
      : undefined;

  if (
    dataCallerType === "axios" &&
    axiosStyleError &&
    axiosStyleError.response &&
    axiosStyleError.response.data
  ) {
    logger({ error, dataCallerType, location });

    return responseHandler({
      message: "Unable to fetch data",
      payload: { mockData, error: axiosStyleError.response.data },
      status: false,
    });
  }

  const fetchStyleError =
    dataCallerType === "fetch"
      ? (error_ as typeof error_ & { message: string })
      : undefined;

  if (
    dataCallerType === "fetch" &&
    fetchStyleError &&
    fetchStyleError.message
  ) {
    logger({ error, dataCallerType, location });

    return responseHandler({
      message: fetchStyleError.message,
      payload: { mockData, error: undefined },
      status: false,
    });
  }

  logger({ error, dataCallerType, location });

  return responseHandler({
    message: error_.message,
    payload: mockData,
    status: false,
  });
};

export default errorHandler;
