"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authenticateUserService = _interopRequireDefault(require("../services/authenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
sessionsRouter.post('/', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const authenticateUserService = new _authenticateUserService.default();
  const {
    user,
    token
  } = await authenticateUserService.execute({
    email,
    password
  });
  return res.status(200).json({
    user,
    token
  });
});
var _default = sessionsRouter;
exports.default = _default;