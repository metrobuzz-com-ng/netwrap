import utils from "../utils";

if (!utils.isReactAvailable()) {
  utils.logger("useFetcher can only be used in React based projects", {
    isError: true,
  });

  throw new Error();
}

import { useState } from "react";

type useFetcherProps<T, K, P> = {
  onSuccess?: (data: K) => void;
  onError?: (error: P) => void;
  onFinal?: () => void;
  queryFn: (requestData?: T) => Promise<K>;
};

const useFetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>
) => {
  const [mainData, setData] = useState<ResponsePayloadType | null>(null);

  const [mainError, setError] = useState<ErrorResponseType | unknown>(null);

  const [isLoading, setIsLoading] = useState(false);

  const trigger = async (triggerData?: RequestType) => {
    setIsLoading(true);
    try {
      const data = await props.queryFn(triggerData);

      props?.onSuccess?.(data as ResponsePayloadType);
      setData(data as ResponsePayloadType);

      return {
        status: true,
        message: "Successfully made request",
        payload: data,
      };
    } catch (error: unknown) {
      props?.onError?.(error as ErrorResponseType);
      setError(error);
      return {
        status: false,
        message: "Unable to make request",
        payload: null,
      };
    } finally {
      props?.onFinal?.();
      setIsLoading(false);
    }
  };

  return {
    trigger,
    data: mainData,
    error: mainError,
    isLoading,
  };
};

export default useFetcher;
