"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConsole = exports.log = void 0;
var log = function (data, shouldLog, hideLogs) {
    if (hideLogs === void 0) { hideLogs = false; }
    if (typeof shouldLog === "undefined" || shouldLog === true) {
        return console.log(data);
    }
    if (shouldLog === false) {
        !hideLogs && console.log("Logging is disabled");
    }
};
exports.log = log;
var useConsole = function () {
    return {
        log: exports.log,
    };
};
exports.useConsole = useConsole;
