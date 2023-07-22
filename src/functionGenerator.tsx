import axios from "axios";
import { useState } from "react";
import { successHandler } from "./successHandler";
import { errorHandler } from "./errorHandler";
import { DataCallerType, HookGenerator } from "./types";
import { calledFunction } from "./errorCallerFunction";
import { simulateDataCall } from "./simulateDataCall";

export const functionGenerator = <T extends DataCallerType>({
  name,
  dataCallerType,
  requestData,
  signal,
  headers,
  onUploadProgress,
  dataCaller,
  location = calledFunction(),
  mockData = undefined,
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
          const response = await axios.request({
            ...otherProps,
            method: otherProps.method || "get",
            url: otherProps.url || "",
            data: requestData,
            signal,
            headers,
            onUploadProgress,
          });

          data = response.data;
        } else if (dataCallerType === "fetch") {
          // fetch call
          const response = await fetch(otherProps.url || "", {
            method: otherProps.method || "get",
            body: requestData,
            signal: signal as AbortSignal,
            headers: headers as HeadersInit,
          });

          data = await response.json();
        } else if (dataCallerType === "custom") {
          data = dataCaller && (await dataCaller());
        } else if (dataCallerType === "simulate") {
          data = await simulateDataCall(5000, mockData);
        }

        if (!data) throw new Error("No data returned");

        return successHandler({
          message: "Successfully gotten returned data",
          payload: data,
        });
      } catch (error) {
        return errorHandler({ error, dataCallerType, location });
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
