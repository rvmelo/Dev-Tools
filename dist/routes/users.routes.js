"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _createUserService = _interopRequireDefault(require("../services/createUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().trim().email().required(),
    password: _celebrate.Joi.string().trim().min(3).required()
  }
}), async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const createUserService = new _createUserService.default();
  const user = await createUserService.execute({
    email,
    password
  });
  return res.status(201).json(user);
});
var _default = usersRouter;
exports.default = _default;