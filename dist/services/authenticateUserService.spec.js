"use strict";

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _authenticateUserService = _interopRequireDefault(require("./authenticateUserService"));

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
  it('should be able to authenticate', async () => {
    const createUserService = new _createUserService.default();
    const authenticateUserService = new _authenticateUserService.default();
    const user = await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    });
    const response = await authenticateUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate', async () => {
    const createUserService = new _createUserService.default();
    const authenticateUserService = new _authenticateUserService.default();
    await createUserService.execute({
      email: 'yennefer@gmail.com',
      password: '123456'
    });
    await expect(authenticateUserService.execute({
      email: 'yennefer@gmail.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(_appError.default);
  });
  it('should not be able to authenticate with non-existing email', async () => {
    const authenticateUserService = new _authenticateUserService.default();
    await expect(authenticateUserService.execute({
      email: 'yennefer@gmail.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(_appError.default);
  });
});