import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { DataCallerType, HookGenerator } from "./types";
import utils from "./utils";

export const useFunctionGenerator = <T extends DataCallerType>({
  name,
  dataCallerType,
  location = utils.calledFunction(),
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

  const mainFunction = async (requestData?: any) => {
    const getData = () => {
      if (requestData) return requestData;

      if (otherProps.requestData) return otherProps.requestData;

      if (otherProps.mockData) return otherProps.mockData;

      return undefined;
    };

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

        const url = otherProps.url || "";

        const response = await axios.request({
          method: otherProps.method || "get",
          url,
          data: getData(),
          signal: otherProps.signal as AxiosRequestConfig<any>["signal"],
          headers: otherProps.headers as AxiosRequestConfig<any>["headers"],
        });

        data = response;
      } else if (dataCallerType === "fetch") {
        // fetch call

        if (!otherProps.method || !otherProps.url) {
          throw new Error(
            'For "fetch" dataCallerType, "method" and "url" are required properties.'
          );
        }

        const requestedData = getData();

        const response = await fetch(otherProps.url || "", {
          method: otherProps.method || "get",
          body: requestedData ? JSON.stringify(data) : undefined,
          signal: otherProps.signal as AbortSignal,
          headers: otherProps.headers as HeadersInit,
        });

        data = await response.json();
      } else if (dataCallerType === "custom") {
        data = otherProps.dataCaller && (await otherProps.dataCaller());
      } else if (dataCallerType === "simulate") {
        if (!otherProps.mockData) throw new Error("No mock data provided");
        data = await utils.simulateDataCall(
          otherProps.dataDelay as number,
          getData()
        );
      }

      if (!data) throw new Error("No data returned");

      return utils.responseHandler({
        message: "Successfully gotten returned data",
        payload: data,
      });
    } catch (error) {
      return utils.errorHandler({
        error,
        dataCallerType,
        location,
        mockData: dataCallerType === "simulate" ? getData() : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    functions: {
      takeAction: mainFunction,
      [functionName]: mainFunction,
    },
    loaders: {
      isLoading,
    },
  };
};

export const functionGenerator = useFunctionGenerator;
