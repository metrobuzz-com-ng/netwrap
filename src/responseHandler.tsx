import { ResponseHandler } from "./types";

export const responseHandler: ResponseHandler = ({
  status = true,
  message,
  payload,
}) => ({
  message,
  payload,
  status,
});
