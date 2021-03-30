"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _createOrderService = _interopRequireDefault(require("../services/createOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersRouter = (0, _express.Router)();
ordersRouter.use(_ensureAuthenticated.default);
ordersRouter.post('/', async (req, res) => {
  const {
    order_tools
  } = req.body;
  const createOrderService = new _createOrderService.default();
  const userOrder = await createOrderService.execute({
    order_tools,
    user_id: req.user.id
  });
  return res.status(201).json(userOrder);
});
var _default = ordersRouter;
exports.default = _default;