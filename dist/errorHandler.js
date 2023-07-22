"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var console_1 = require("./console");
var errorHandler = function (_a) {
    var error = _a.error, dataCallerType = _a.dataCallerType, _b = _a.location, location = _b === void 0 ? "An error occurred in the errorHandler function" : _b;
    (0, console_1.log)({ error: error, dataCallerType: dataCallerType, location: location });
    var error_ = error;
    var getErrorInstance = function () { return error_ instanceof Error; };
    if (!error_ || !getErrorInstance()) {
        (0, console_1.log)({ error: error, dataCallerType: dataCallerType, location: location });
        return {
            message: "Not an error instance",
            payload: error,
            status: false,
        };
    }
    var axiosStyleError = dataCallerType === "axios"
        ? error_
        : undefined;
    if (dataCallerType === "axios" &&
        axiosStyleError &&
        axiosStyleError.response &&
        axiosStyleError.response.data) {
        (0, console_1.log)({ error: error, dataCallerType: dataCallerType, location: location });
        return {
            message: axiosStyleError.response.data.message,
            payload: axiosStyleError.response.data.payload,
            status: false,
        };
    }
    var fetchStyleError = dataCallerType === "fetch"
        ? error_
        : undefined;
    if (dataCallerType === "fetch" &&
        fetchStyleError &&
        fetchStyleError.message) {
        (0, console_1.log)({ error: error, dataCallerType: dataCallerType, location: location });
        return {
            message: fetchStyleError.message,
            payload: undefined,
            status: false,
        };
    }
    (0, console_1.log)({ error: error, dataCallerType: dataCallerType, location: location });
    return {
        message: error_.message,
        payload: undefined,
        status: false,
    };
};
exports.errorHandler = errorHandler;
