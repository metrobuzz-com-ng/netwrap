import { SuccessHandler } from "./types";

export const successHandler: SuccessHandler = ({ message, payload }) => ({
  message,
  payload,
  status: true,
});
