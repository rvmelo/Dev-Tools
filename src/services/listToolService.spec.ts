/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import ListToolService from './listToolsService';

describe('ListToolService', () => {
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

  it('should list all tools', async () => {
    const createToolService = new CreateToolService();
    const listToolService = new ListToolService();

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
      tags: ['node'],
    });

    const tools = await listToolService.execute();

    expect(tools[0]).toMatchObject({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });
    expect(tools[1]).toMatchObject({
      title: 'second tool',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });
  });
});
