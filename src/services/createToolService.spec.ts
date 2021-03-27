/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';

describe('CreateToolService', () => {
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

  it('should create new tool', async () => {
    const createToolService = new CreateToolService();

    const tool = await createToolService.execute({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });

    await expect(tool).toMatchObject({
      title: 'nodeJS',
      link: 'www.omelete.com',
      description: 'ferramenta backend',
      tags: ['node'],
    });
  });
});
