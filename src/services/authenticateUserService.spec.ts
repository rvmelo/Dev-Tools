/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import AppError from '../errors/appError';

import AuthenticateUserService from './authenticateUserService';
import CreateUserService from './createUserService';

describe('AuthenticateUserService', () => {
  beforeAll(async done => {
    await createConnection();
    done();
  });

  beforeEach(async done => {
    // Fetch all the entities
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }

    done();
  });

  afterAll(async done => {
    await getConnection().close();

    done();
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
