import { log } from "./console";
import { ErrorHandler } from "./types";

export const errorHandler: ErrorHandler = ({
  error,
  dataCallerType,
  location = "An error occurred in the errorHandler function",
}) => {
  log({ error, dataCallerType, location });

  const error_ = error as Error;

  const getErrorInstance = () => error_ instanceof Error;

  if (!error_ || !getErrorInstance()) {
    log({ error, dataCallerType, location });

    return {
      message: "Not an error instance",
      payload: error,
      status: false,
    };
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
    log({ error, dataCallerType, location });

    return {
      message: axiosStyleError.response.data.message,
      payload: axiosStyleError.response.data.payload,
      status: false,
    };
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
    log({ error, dataCallerType, location });

    return {
      message: fetchStyleError.message,
      payload: undefined,
      status: false,
    };
  }

  log({ error, dataCallerType, location });

  return {
    message: error_.message,
    payload: undefined,
    status: false,
  };
};
