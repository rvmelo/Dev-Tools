"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _listToolsService = _interopRequireDefault(require("./listToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('ListToolService', () => {
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
  it('should list all tools', async () => {
    const createToolService = new _createToolService.default();
    const listToolService = new _listToolsService.default();
    await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
    await createToolService.execute({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
    const tools = await listToolService.execute();
    expect(tools).toHaveLength(2);
  });
});