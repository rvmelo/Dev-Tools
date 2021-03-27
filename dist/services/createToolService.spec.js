"use strict";

var _typeorm = require("typeorm");

var _createToolService = _interopRequireDefault(require("./createToolService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
describe('CreateToolService', () => {
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
  it('should create new tool', async () => {
    const createToolService = new _createToolService.default();
    const tool = await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
    await expect(tool).toMatchObject({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node']
    });
  });
});