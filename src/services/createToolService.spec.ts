import { Connection, createConnection, getConnection } from 'typeorm';

import CreateToolService from './createToolService';

let connection: Connection;

describe('CreateToolService', () => {
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
