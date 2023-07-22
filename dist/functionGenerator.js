"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionGenerator = void 0;
var axios_1 = __importDefault(require("axios"));
var react_1 = require("react");
var successHandler_1 = require("./successHandler");
var errorHandler_1 = require("./errorHandler");
var errorCallerFunction_1 = require("./errorCallerFunction");
var simulateDataCall_1 = require("./simulateDataCall");
var functionGenerator = function (_a) {
  var name = _a.name,
    dataCallerType = _a.dataCallerType,
    requestData = _a.requestData,
    signal = _a.signal,
    headers = _a.headers,
    onUploadProgress = _a.onUploadProgress,
    dataCaller = _a.dataCaller,
    _b = _a.location,
    location = _b === void 0 ? (0, errorCallerFunction_1.calledFunction)() : _b,
    _c = _a.mockData,
    mockData = _c === void 0 ? undefined : _c,
    otherProps = __rest(_a, [
      "name",
      "dataCallerType",
      "requestData",
      "signal",
      "headers",
      "onUploadProgress",
      "dataCaller",
      "location",
      "mockData",
    ]);
  var _d = (0, react_1.useState)(false),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var toPascalCase = function (str) {
    var _a;
    return (
      ((_a = str.match(/[a-z]+/gi)) === null || _a === void 0
        ? void 0
        : _a
            .map(function (word) {
              return (
                word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
              );
            })
            .join("")) || ""
    );
  };
  var functionName = "use".concat(toPascalCase(name));
  var functionHandler = function () {
    var _a;
    var mainFunction = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var data, response, response, _a, error_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              setIsLoading(true);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 12, 13, 14]);
              data = undefined;
              if (!(dataCallerType === "axios")) return [3 /*break*/, 3];
              return [
                4 /*yield*/,
                axios_1.default.request(
                  __assign(__assign({}, otherProps), {
                    method: otherProps.method || "get",
                    url: otherProps.url || "",
                    data: requestData,
                    signal: signal,
                    headers: headers,
                    onUploadProgress: onUploadProgress,
                  })
                ),
              ];
            case 2:
              response = _b.sent();
              data = response.data;
              return [3 /*break*/, 11];
            case 3:
              if (!(dataCallerType === "fetch")) return [3 /*break*/, 6];
              return [
                4 /*yield*/,
                fetch(otherProps.url || "", {
                  method: otherProps.method || "get",
                  body: requestData,
                  signal: signal,
                  headers: headers,
                }),
              ];
            case 4:
              response = _b.sent();
              return [4 /*yield*/, response.json()];
            case 5:
              data = _b.sent();
              return [3 /*break*/, 11];
            case 6:
              if (!(dataCallerType === "custom")) return [3 /*break*/, 9];
              _a = dataCaller;
              if (!_a) return [3 /*break*/, 8];
              return [4 /*yield*/, dataCaller()];
            case 7:
              _a = _b.sent();
              _b.label = 8;
            case 8:
              data = _a;
              return [3 /*break*/, 11];
            case 9:
              if (!(dataCallerType === "simulate")) return [3 /*break*/, 11];
              return [
                4 /*yield*/,
                (0, simulateDataCall_1.simulateDataCall)(5000, mockData),
              ];
            case 10:
              data = _b.sent();
              _b.label = 11;
            case 11:
              if (!data) throw new Error("No data returned");
              return [
                2 /*return*/,
                (0, successHandler_1.successHandler)({
                  message: "Successfully gotten returned data",
                  payload: data,
                }),
              ];
            case 12:
              error_1 = _b.sent();
              return [
                2 /*return*/,
                (0, errorHandler_1.errorHandler)({
                  error: error_1,
                  dataCallerType: dataCallerType,
                  location: location,
                }),
              ];
            case 13:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 14:
              return [2 /*return*/];
          }
        });
      });
    };
    return {
      functions: ((_a = {}), (_a[functionName] = mainFunction), _a),
      loaders: {
        isLoading: isLoading,
      },
    };
  };
  return functionHandler();
};
exports.functionGenerator = functionGenerator;
