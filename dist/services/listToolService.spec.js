"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _listToolsService = _interopRequireDefault(require("./listToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
describe('ListToolService', () => {
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
    expect(tools[0]).toMatchObject({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
    expect(tools[1]).toMatchObject({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
  });
});