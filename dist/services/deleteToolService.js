"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Tool = _interopRequireDefault(require("../models/Tool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteToolService {
  async execute({
    id
  }) {
    const toolsRepository = (0, _typeorm.getRepository)(_Tool.default);
    await toolsRepository.delete(id);
  }

}

var _default = DeleteToolService;
exports.default = _default;