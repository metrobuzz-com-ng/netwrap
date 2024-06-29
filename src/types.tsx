import axios, { AxiosRequestConfig } from "axios";

export type DataCallerType = "axios" | "fetch" | "custom" | "simulate";

type DefaultHttpData = {
  method?: never;
  url?: never;
  headers?: never;
  signal?: never;
  requestData?: never;
};

type DefaultMockData = {
  mockData?: never;
  dataDelay?: never;
};

type DefaultDataCallerData = {
  dataCaller?: never;
};

type AxiosHeaders = Parameters<typeof axios.request>[0]["headers"];

type EnforceDataCallerType<T> = T extends "fetch"
  ? {
      method: RequestInit["method"];
      url: string;
      headers?: RequestInit["headers"];
      signal?: AbortSignal | null;
      requestData?: any;
    } & DefaultMockData &
      DefaultDataCallerData
  : T extends "axios"
  ? {
      method: AxiosRequestConfig["method"];
      url: string;
      headers?: AxiosHeaders;
      signal?: AxiosRequestConfig["signal"];
      requestData?: AxiosRequestConfig["data"];
      onUploadProgress?: AxiosRequestConfig["onUploadProgress"];
    } & DefaultMockData &
      DefaultDataCallerData
  : T extends "custom"
  ? {
      dataCaller: () => any;
    } & DefaultHttpData &
      DefaultMockData
  : T extends "simulate"
  ? {
      mockData: Record<string, any>;
      dataDelay: number;
    } & DefaultHttpData &
      DefaultDataCallerData
  : DefaultDataCallerData & DefaultHttpData & DefaultMockData;

// Final HookGenerator type with required properties and separate "simulate" properties
export type HookGenerator<T extends DataCallerType> = {
  name: string;
  dataCallerType: T;
  location?: any;
} & EnforceDataCallerType<T>;

export type HandlerProps = {
  message: string;
  payload: any;
  status?: boolean;
};

export type ResponseHandler = (data: HandlerProps) => HandlerProps;

export type ErrorHandlerProps = {
  error: unknown;
  dataCallerType: DataCallerType;
  location: string;
  mockData?: any;
};

export type ErrorHandler = (body: ErrorHandlerProps) => HandlerProps;

export type Logger = (
  data: any,
  options?: {
    shouldLog?: boolean;
    isError?: boolean;
  }
) => void;
