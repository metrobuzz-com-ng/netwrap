import { HandlerProps, useFetcherProps } from "../types";
import utils from "../utils";

class EventEmitter {
  private events: { [key: string]: Function[] } = {};

  on(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => listener(...args));
  }
}

const fetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>
): {
  trigger: (triggerData?: RequestType | undefined) => Promise<HandlerProps>;
  data: ResponsePayloadType | null;
  error: ErrorResponseType | unknown;
  onLoadingChange: (listener: (isLoading: boolean) => void) => void;
} => {
  let mainData: ResponsePayloadType | null = null;
  let mainError: ErrorResponseType | unknown = null;
  const emitter = new EventEmitter();

  const trigger = async (triggerData?: RequestType) => {
    emitter.emit("isLoading", true);
    utils.logger("Fetching...");
    props?.onStartQuery?.();

    try {
      const data = await props.queryFn(triggerData);
      props?.onSuccess?.(data as ResponsePayloadType);
      mainData = data as ResponsePayloadType;

      return utils.responseHandler({
        message: "Successfully made request",
        payload: data,
      });
    } catch (error: unknown) {
      props?.onError?.(error as ErrorResponseType);
      mainError = error;
      return {
        status: false,
        message: "Unable to make request",
        payload: null,
      };
    } finally {
      props?.onFinal?.();
      emitter.emit("isLoading", false);
    }
  };

  return {
    trigger,
    data: mainData,
    error: mainError,
    onLoadingChange: (listener: (isLoading: boolean) => void) => {
      emitter.on("isLoading", listener);
      utils.logger("Registered isLoading listener");
    },
  };
};

export default fetcher;
