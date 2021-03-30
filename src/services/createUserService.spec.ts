import { Connection, createConnection, getConnection } from 'typeorm';

import AppError from '../errors/appError';

import CreateUserService from './createUserService';

let connection: Connection;

describe('AuthenticateUserService', () => {
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

  it('should create new user', async () => {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456',
    });

    await expect(user).toMatchObject({
      email: 'yennefer@gmail.com',
    });
  });

  it('should not create user with email that already exists', async () => {
    const createUserService = new CreateUserService();

    await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'yennefer@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
