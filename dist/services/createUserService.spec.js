"use strict";

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _createUserService = _interopRequireDefault(require("./createUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('AuthenticateUserService', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
  });
  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM tools');
  });
  afterAll(async () => {
    const mainConnection = (0, _typeorm.getConnection)();
    await connection.close();
    await mainConnection.close();
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