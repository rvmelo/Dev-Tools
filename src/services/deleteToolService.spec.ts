/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import DeleteToolService from './deleteToolService';
import ListToolsService from './listToolsService';

describe('DeleteToolService', () => {
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

  it('should delete given tool', async () => {
    const createToolService = new CreateToolService();
    const deleteToolService = new DeleteToolService();
    const listToolsService = new ListToolsService();

    const tool = await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });

    await deleteToolService.execute({ id: tool.id });

    const tools = await listToolsService.execute();

    expect(tools).toEqual([]);
  });
});
