import { DataCallerType, HookGenerator } from "./types";
export declare const functionGenerator: <T extends DataCallerType>({ name, dataCallerType, requestData, signal, headers, onUploadProgress, dataCaller, location, mockData, ...otherProps }: HookGenerator<T>) => {
    functions: {
        [x: string]: () => Promise<import("./types").HandlerProps & {
            status: boolean;
        }>;
    };
    loaders: {
        isLoading: boolean;
    };
};
