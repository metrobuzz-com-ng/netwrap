export type HandlerProps = {
  message: string;
  payload: any;
  status?: boolean;
};

export type ResponseHandler = (data: HandlerProps) => HandlerProps;

export type useFetcherProps<T, K, P> = {
  onSuccess?: (data: K) => void;
  onError?: (error: P) => void;
  onFinal?: () => void;
  queryFn: (requestData?: T) => Promise<K>;
};

export type Logger = (
  data: any,
  options?: {
    shouldLog?: boolean;
    isError?: boolean;
  }
) => void;
