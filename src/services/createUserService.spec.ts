/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createConnection, getConnection } from 'typeorm';

import AppError from '../errors/appError';

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
