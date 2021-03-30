"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _deleteToolService = _interopRequireDefault(require("./deleteToolService"));

var _listToolsService = _interopRequireDefault(require("./listToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('DeleteToolService', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
  });
  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM tools');
  });
  afterAll(async () => {
    const mainConnection = (0, _typeorm.getConnection)();
    await connection.close();
    await mainConnection.close();
  });
  it('should delete given tool', async () => {
    const createToolService = new _createToolService.default();
    const deleteToolService = new _deleteToolService.default();
    const listToolsService = new _listToolsService.default();
    const tool = await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
    await deleteToolService.execute({
      id: tool.id
    });
    const tools = await listToolsService.execute();
    expect(tools).toEqual([]);
  });
});