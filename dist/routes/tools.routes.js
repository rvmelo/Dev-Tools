"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _createToolService = _interopRequireDefault(require("../services/createToolService"));

var _listToolsService = _interopRequireDefault(require("../services/listToolsService"));

var _searchToolsService = _interopRequireDefault(require("../services/searchToolsService"));

var _deleteToolService = _interopRequireDefault(require("../services/deleteToolService"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  services
//   middlewares
const toolsRouter = (0, _express.Router)();
toolsRouter.use(_ensureAuthenticated.default);
toolsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    title: _celebrate.Joi.string().trim().required(),
    link: _celebrate.Joi.string().trim().uri().required(),
    description: _celebrate.Joi.string().trim(),
    tags: _celebrate.Joi.array().required()
  }
}), async (req, res) => {
  const {
    title,
    link,
    description,
    tags
  } = req.body;
  const createToolService = new _createToolService.default();
  const tool = await createToolService.execute({
    title,
    link,
    description,
    tags
  });
  return res.status(201).json(tool);
});
toolsRouter.get('/list', async (req, res) => {
  const listToolsService = new _listToolsService.default();
  const tools = await listToolsService.execute();
  return res.status(200).json(tools);
});
toolsRouter.get('/search', async (req, res) => {
  const {
    tag
  } = req.query;
  const searchToolsService = new _searchToolsService.default();
  const tools = await searchToolsService.execute({
    tag: `${tag}`
  });
  return res.status(200).json(tools);
});
toolsRouter.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const deleteToolService = new _deleteToolService.default();
  await deleteToolService.execute({
    id
  });
  return res.status(204).json();
});
var _default = toolsRouter;
exports.default = _default;