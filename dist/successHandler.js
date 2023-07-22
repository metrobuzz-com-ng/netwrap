"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandler = void 0;
var successHandler = function (_a) {
    var message = _a.message, payload = _a.payload;
    return ({
        message: message,
        payload: payload,
        status: true,
    });
};
exports.successHandler = successHandler;
