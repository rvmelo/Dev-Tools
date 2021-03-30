import { Connection, createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';
import DeleteToolService from './deleteToolService';
import ListToolsService from './listToolsService';

let connection: Connection;

describe('DeleteToolService', () => {
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
