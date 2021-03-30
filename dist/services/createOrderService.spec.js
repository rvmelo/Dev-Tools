"use strict";

var _typeorm = require("typeorm");

var _appError = _interopRequireDefault(require("../errors/appError"));

var _createToolService = _interopRequireDefault(require("./createToolService"));

var _createOrderService = _interopRequireDefault(require("./createOrderService"));

var _createUserService = _interopRequireDefault(require("./createUserService"));

var _deleteToolService = _interopRequireDefault(require("./deleteToolService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('CreateOrderService', () => {
  let createUserService;
  let createToolService;
  let createOrderService;
  let deleteToolService;
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)();
  });
  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM tools');
    await connection.query('DELETE FROM orders_tools');
    await connection.query('DELETE FROM orders');
    createUserService = new _createUserService.default();
    createToolService = new _createToolService.default();
    createOrderService = new _createOrderService.default();
    deleteToolService = new _deleteToolService.default();
  });
  afterAll(async () => {
    const mainConnection = (0, _typeorm.getConnection)();
    await connection.close();
    await mainConnection.close();
  });
  it('should create a new order', async () => {
    const user = await createUserService.execute({
      email: 'rvmelo@gamil.com',
      password: '123456'
    });
    const tool = await createToolService.execute({
      title: 'react',
      link: 'https://www.react.com',
      description: 'frontend framework',
      tags: ['frontend']
    });
    const order = await createOrderService.execute({
      user_id: user.id,
      order_tools: [{
        tool_id: tool.id,
        quantity: 5
      }]
    });
    await expect(order).toMatchObject({
      user_id: user.id,
      user: {
        id: user.id,
        email: user.email
      },
      order_tools: [{
        tool_id: tool.id,
        order_id: order.id,
        quantity: 5
      }]
    });
  });
  it('should not create new order', async () => {
    const user = await createUserService.execute({
      email: 'rvmelo@gamil.com',
      password: '123456'
    });
    const tool = await createToolService.execute({
      title: 'react',
      link: 'https://www.react.com',
      description: 'frontend framework',
      tags: ['frontend']
    });
    await deleteToolService.execute({
      id: tool.id
    });
    await expect(createOrderService.execute({
      user_id: user.id,
      order_tools: [{
        tool_id: tool.id,
        quantity: 5
      }]
    })).rejects.toBeInstanceOf(_appError.default);
  });
});