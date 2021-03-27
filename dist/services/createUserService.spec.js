"use strict";

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _createUserService = _interopRequireDefault(require("./createUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
describe('AuthenticateUserService', () => {
  beforeAll(async done => {
    await (0, _typeorm.createConnection)();
    done();
  });
  beforeEach(async done => {
    // Fetch all the entities
    const entities = (0, _typeorm.getConnection)().entityMetadatas;

    for (const entity of entities) {
      const repository = await (0, _typeorm.getConnection)().getRepository(entity.name); // Get repository

      await repository.clear(); // Clear each entity table's content
    }

    done();
  });
  afterAll(async done => {
    await (0, _typeorm.getConnection)().close();
    done();
  });
  it('should create new user', async () => {
    const createUserService = new _createUserService.default();
    const user = await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    });
    await expect(user).toMatchObject({
      email: 'yennefer@gmail.com'
    });
  });
  it('should not create user with email that already exists', async () => {
    const createUserService = new _createUserService.default();
    await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    });
    await expect(createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_appError.default);
  });
});