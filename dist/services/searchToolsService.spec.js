"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _searchToolsService = _interopRequireDefault(require("./searchToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
describe('SearchToolsService', () => {
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