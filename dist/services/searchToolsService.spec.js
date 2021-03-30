"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _searchToolsService = _interopRequireDefault(require("./searchToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('SearchToolsService', () => {
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
  it('should find given tool', async () => {
    const createToolService = new _createToolService.default();
    const searchToolsService = new _searchToolsService.default();
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
      tags: ['github']
    });
    const tools = await searchToolsService.execute({
      tag: 'github'
    });
    expect(tools[0]).toMatchObject({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['github']
    });
  });
});