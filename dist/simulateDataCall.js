"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateDataCall = void 0;
var simulateDataCall = function (delayInMilliseconds, mockData) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(mockData);
        }, delayInMilliseconds);
    });
};
exports.simulateDataCall = simulateDataCall;
