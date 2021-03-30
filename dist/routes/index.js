"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _tools = _interopRequireDefault(require("./tools.routes"));

var _users = _interopRequireDefault(require("./users.routes"));

var _sessions = _interopRequireDefault(require("./sessions.routes"));

var _orders = _interopRequireDefault(require("./orders.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/tools', _tools.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/orders', _orders.default);
var _default = routes;
exports.default = _default;