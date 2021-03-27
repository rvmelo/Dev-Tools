"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Tool = _interopRequireDefault(require("../models/Tool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateToolService {
  async execute({
    title,
    link,
    description,
    tags
  }) {
    const toolsRepository = (0, _typeorm.getRepository)(_Tool.default);
    const tool = toolsRepository.create({
      title,
      link,
      description,
      tags
    });
    await toolsRepository.save(tool);
    return tool;
  }

}

var _default = CreateToolService;
exports.default = _default;