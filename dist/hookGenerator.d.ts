import { DataCallerType, HookGenerator } from "./types";
export declare const useHookGenerator: <T extends DataCallerType>({ name, dataCallerType, requestData, signal, headers, onUploadProgress, dataCaller, ...otherProps }: HookGenerator<T>) => {
    functions: {
        [x: string]: () => Promise<import("./types").HandlerProps & {
            status: boolean;
        }>;
    };
    loaders: {
        isLoading: boolean;
    };
};
