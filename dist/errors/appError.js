"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.statusCode = statusCode;
        this.message = message;
    }
    return AppError;
}());
exports.default = AppError;
