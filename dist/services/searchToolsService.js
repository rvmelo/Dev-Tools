"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Tool = _interopRequireDefault(require("../models/Tool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchToolsService {
  async execute({
    tag
  }) {
    const toolsRepository = (0, _typeorm.getRepository)(_Tool.default);
    const tools = await toolsRepository.createQueryBuilder('tools').where('tools.tags::text[] @> ARRAY[:tag]::text[]', {
      tag
    }).getMany();
    return tools;
  }

}

var _default = SearchToolsService;
exports.default = _default;