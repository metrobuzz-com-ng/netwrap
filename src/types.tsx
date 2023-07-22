import { Axios, AxiosProgressEvent, AxiosRequestConfig } from "axios";

export type DataCallerType = "axios" | "fetch" | "custom" | "simulate";

// Enforce that dataCaller function returns something for custom dataCallerType
// Enforce that dataCaller function returns something for custom dataCallerType
type EnforceCustomDataCallerReturnType<T> = T extends "custom"
  ? {
      dataCaller: () => any; // Modify the return type as per your requirement
    }
  : {
      dataCaller?: never;
    };
type EnforceFetchDataCallerType<T> = T extends "fetch"
  ? {
      method?: RequestInit["method"];
      url?: string;
      headers: RequestInit["headers"];
      signal: AbortSignal | null;
      requestData: any;
    }
  : {
      method?: never;
      url?: never;
      headers?: never;
      signal?: never;
      requestData?: never;
    };

type EnforceAxiosDataCallerType<T> = T extends "axios"
  ? {
      method: AxiosRequestConfig<any>["method"];
      url: string;
      headers?: AxiosRequestConfig<any>["headers"];
      signal?: AxiosRequestConfig<any>["signal"];
      requestData?: AxiosRequestConfig<any>["data"];
      onUploadProgress?: AxiosRequestConfig<any>["onUploadProgress"];
    }
  : {
      method?: never;
      url?: never;
      headers?: never;
      signal?: never;
      requestData?: never;
      onUploadProgress?: never;
    };

type EnforceSimulateDataCallerType<T> = T extends "simulate"
  ? {
      mockData: any; // Modify the type as per your requirement
      dataDelay: number; // Enforce dataDelay as a required number
    }
  : {
      mockData?: never;
      dataDelay?: never;
    };

// Final HookGenerator type with required properties and separate "simulate" properties
export type HookGenerator<T extends DataCallerType> = {
  name: string;
  dataCallerType: T;
  location?: any;
} & EnforceCustomDataCallerReturnType<T> &
  EnforceFetchDataCallerType<T> &
  EnforceAxiosDataCallerType<T> &
  EnforceSimulateDataCallerType<T>;

export type HandlerProps = {
  message: string;
  payload: any;
};

export type SuccessHandler = (
  data: HandlerProps
) => HandlerProps & { status: boolean };

export type ErrorHandlerProps = {
  error: unknown;
  dataCallerType: DataCallerType;
  location: string;
  mockData?: any;
};

export type ErrorHandler = (body: ErrorHandlerProps) => HandlerProps & {
  status: boolean;
};
