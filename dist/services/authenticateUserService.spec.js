"use strict";

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _authenticateUserService = _interopRequireDefault(require("./authenticateUserService"));

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