import { Connection, createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import ListToolService from './listToolsService';

let connection: Connection;

describe('ListToolService', () => {
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

    expect(tools).toHaveLength(2);
  });
});
