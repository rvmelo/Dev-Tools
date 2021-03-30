import { Connection, createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import SearchToolsService from './searchToolsService';

let connection: Connection;

describe('SearchToolsService', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM tools');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
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
