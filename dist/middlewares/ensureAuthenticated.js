"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var appError_1 = __importDefault(require("../errors/appError"));
var auth_1 = __importDefault(require("../config/auth"));
function default_1(req, res, next) {
    var authHeaders = req.headers.authorization;
    if (!authHeaders) {
        throw new appError_1.default('JWT is missing', 401);
    }
    var token = authHeaders === null || authHeaders === void 0 ? void 0 : authHeaders.split(' ')[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoded.sub;
        req.user = { id: sub };
        return next();
    }
    catch (_a) {
        throw new appError_1.default('Invalid JWT token', 401);
    }
}
exports.default = default_1;
