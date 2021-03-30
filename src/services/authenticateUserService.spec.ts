import { Connection, createConnection, getConnection } from 'typeorm';

import AppError from '../errors/appError';

import AuthenticateUserService from './authenticateUserService';
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

  it('should be able to authenticate', async () => {
    const createUserService = new CreateUserService();
    const authenticateUserService = new AuthenticateUserService();

    const user = await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate', async () => {
    const createUserService = new CreateUserService();
    const authenticateUserService = new AuthenticateUserService();

    await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'yennefer@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non-existing email', async () => {
    const authenticateUserService = new AuthenticateUserService();

    await expect(
      authenticateUserService.execute({
        email: 'yennefer@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
