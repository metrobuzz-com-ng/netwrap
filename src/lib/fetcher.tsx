type useFetcherProps<T, K, P> = {
  onSuccess?: (data: K) => void;
  onError?: (error: P) => void;
  onFinal?: () => void;
  queryFn: (requestData?: T) => Promise<K>;
};

const fetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>
) => {
  let mainData: ResponsePayloadType | null = null;

  let mainError: ErrorResponseType | unknown = null;

  let isLoading = false;

  const trigger = async (triggerData?: RequestType) => {
    isLoading = true;
    try {
      const data = await props.queryFn(triggerData);

      props?.onSuccess?.(data as ResponsePayloadType);
      mainData = data as ResponsePayloadType;

      return {
        status: true,
        message: "Successfully made request",
        payload: data,
      };
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
      isLoading = false;
    }
  };

  return {
    trigger,
    data: mainData,
    error: mainError,
    isLoading,
  };
};

export default fetcher;
