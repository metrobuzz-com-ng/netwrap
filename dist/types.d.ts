import { AxiosRequestConfig } from "axios";
export type DataCallerType = "axios" | "fetch" | "custom" | "simulate";
type FetchPropsMerger = Merge<AxiosRequestConfig<any>, RequestInit & {
    url: string;
}>;
type Merge<T, U> = T & Omit<U, keyof T>;
export type HookGenerator<T extends DataCallerType> = {
    name: string;
    dataCallerType: T;
    location?: string;
    mockData?: any;
} & (T extends "axios" ? AxiosRequestConfig & {
    requestData?: any;
    dataCaller?: never;
    headers?: AxiosRequestConfig["headers"];
} : T extends "fetch" ? FetchPropsMerger & {
    requestData?: any;
    dataCaller?: never;
    headers?: RequestInit["headers"];
} : {
    dataCaller: () => Promise<any>;
    requestData?: never;
    method?: never;
    url?: never;
    signal?: never;
    headers?: never;
    onUploadProgress?: never;
});
export type HandlerProps = {
    message: string;
    payload: any;
};
export type SuccessHandler = (data: HandlerProps) => HandlerProps & {
    status: boolean;
};
export type ErrorHandlerProps = {
    error: unknown;
    dataCallerType: DataCallerType;
    location: string;
};
export type ErrorHandler = (body: ErrorHandlerProps) => HandlerProps & {
    status: boolean;
};
export {};
