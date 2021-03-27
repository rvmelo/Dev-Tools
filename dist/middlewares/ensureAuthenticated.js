"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _jsonwebtoken = require("jsonwebtoken");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new _appError.default('JWT is missing', 401);
  }

  const token = authHeaders === null || authHeaders === void 0 ? void 0 : authHeaders.split(' ')[1];

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _appError.default('Invalid JWT token', 401);
  }
}