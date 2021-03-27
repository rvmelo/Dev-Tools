"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _deleteToolService = _interopRequireDefault(require("./deleteToolService"));

var _listToolsService = _interopRequireDefault(require("./listToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
describe('DeleteToolService', () => {
  beforeAll(async done => {
    await (0, _typeorm.createConnection)();
    done();
  });
  beforeEach(async () => {
    // Fetch all the entities
    const entities = (0, _typeorm.getConnection)().entityMetadatas;

    for (const entity of entities) {
      const repository = await (0, _typeorm.getConnection)().getRepository(entity.name); // Get repository

      await repository.clear(); // Clear each entity table's content
    }
  });
  afterAll(async done => {
    await (0, _typeorm.getConnection)().close();
    done();
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