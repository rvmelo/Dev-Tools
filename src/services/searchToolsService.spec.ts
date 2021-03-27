/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import SearchToolsService from './searchToolsService';

describe('SearchToolsService', () => {
  beforeAll(async done => {
    await createConnection();
    done();
  });

  beforeEach(async () => {
    // Fetch all the entities
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }
  });

  afterAll(async done => {
    await getConnection().close();

    done();
  });

  it('should find given tool', async () => {
    const createToolService = new CreateToolService();
    const searchToolsService = new SearchToolsService();

    await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });

    await createToolService.execute({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['github'],
    });

    const tools = await searchToolsService.execute({ tag: 'github' });

    expect(tools[0]).toMatchObject({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['github'],
    });
  });
});
