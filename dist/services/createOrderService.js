"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _Tool = _interopRequireDefault(require("../models/Tool"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateOrderService {
  async execute({
    user_id,
    order_tools
  }) {
    const ordersRepository = (0, _typeorm.getRepository)(_Order.default);
    const toolsRepository = (0, _typeorm.getRepository)(_Tool.default);
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const user = await usersRepository.findOne({
      where: {
        id: user_id
      }
    });
    const toolIds = order_tools.map(orderTool => ({
      id: orderTool.tool_id
    }));
    const foundTools = await toolsRepository.findByIds(toolIds);

    if (foundTools.length !== order_tools.length) {
      throw new _appError.default('all tools should be available on the database');
    }

    const order = ordersRepository.create({
      user_id,
      user,
      order_tools
    });
    await ordersRepository.save(order);
    return { ...order,
      user: (0, _classTransformer.classToClass)(order.user)
    };
  }

}

var _default = CreateOrderService;
exports.default = _default;