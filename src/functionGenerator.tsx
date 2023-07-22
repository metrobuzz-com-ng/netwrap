import axios from "axios";
import { useState } from "react";
import { successHandler } from "./successHandler";
import { errorHandler } from "./errorHandler";
import { DataCallerType, HookGenerator } from "./types";
import { calledFunction } from "./errorCallerFunction";
import { simulateDataCall } from "./simulateDataCall";

export const useFunctionGenerator = <T extends DataCallerType>({
  name,
  dataCallerType,
  location = calledFunction(),
  ...otherProps
}: HookGenerator<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const toPascalCase = (str: string) => {
    return (
      str
        .match(/[a-z]+/gi)
        ?.map(
          (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        )
        .join("") || ""
    );
  };

  const functionName = `use${toPascalCase(name)}`;

  const functionHandler = () => {
    const mainFunction = async () => {
      setIsLoading(true);
      try {
        let data = undefined;

        if (dataCallerType === "axios") {
          // axios call

          if (!otherProps.method || !otherProps.url) {
            throw new Error(
              'For "axios" dataCallerType, "method" and "url" are required properties.'
            );
          }

          const response = await axios.request({
            ...otherProps,
            method: otherProps.method || "get",
            url: otherProps.url || "",
            data: otherProps.requestData,
            signal: otherProps.signal,
            headers: otherProps.headers,
            onUploadProgress: otherProps.onUploadProgress,
          });

          data = response.data;
        } else if (dataCallerType === "fetch") {
          // fetch call
          const response = await fetch(otherProps.url || "", {
            method: otherProps.method || "get",
            body: otherProps.requestData,
            signal: otherProps.signal as AbortSignal,
            headers: otherProps.headers as HeadersInit,
          });

          data = await response.json();
        } else if (dataCallerType === "custom") {
          data = otherProps.dataCaller && (await otherProps.dataCaller());
        } else if (dataCallerType === "simulate") {
          if (!otherProps.mockData) throw new Error("No mock data provided");
          data = await simulateDataCall(
            otherProps.dataDelay,
            otherProps.mockData
          );
        }

        if (!data) throw new Error("No data returned");

        return successHandler({
          message: "Successfully gotten returned data",
          payload: data,
        });
      } catch (error) {
        return errorHandler({
          error,
          dataCallerType,
          location,
          mockData:
            dataCallerType === "simulate" ? otherProps.mockData : undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };

    return {
      functions: {
        [functionName]: mainFunction,
      },
      loaders: {
        isLoading,
      },
    };
  };

  return functionHandler();
};
