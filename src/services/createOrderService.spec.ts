import { Connection, createConnection, getConnection } from 'typeorm';

import AppError from '../errors/appError';

import CreateToolService from './createToolService';
import CreateOrderService from './createOrderService';
import CreateUserService from './createUserService';
import DeleteToolService from './deleteToolService';

let connection: Connection;

describe('CreateOrderService', () => {
  let createUserService: CreateUserService;
  let createToolService: CreateToolService;
  let createOrderService: CreateOrderService;
  let deleteToolService: DeleteToolService;

  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM tools');
    await connection.query('DELETE FROM orders_tools');
    await connection.query('DELETE FROM orders');

    createUserService = new CreateUserService();
    createToolService = new CreateToolService();
    createOrderService = new CreateOrderService();
    deleteToolService = new DeleteToolService();
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should create a new order', async () => {
    const user = await createUserService.execute({
      email: 'rvmelo@gamil.com',
      password: '123456',
    });

    const tool = await createToolService.execute({
      title: 'react',
      link: 'https://www.react.com',
      description: 'frontend framework',
      tags: ['frontend'],
    });

    const order = await createOrderService.execute({
      user_id: user.id,
      order_tools: [
        {
          tool_id: tool.id,
          quantity: 5,
        },
      ],
    });

    await expect(order).toMatchObject({
      user_id: user.id,
      user: {
        id: user.id,
        email: user.email,
      },
      order_tools: [
        {
          tool_id: tool.id,
          order_id: order.id,
          quantity: 5,
        },
      ],
    });
  });

  it('should not create new order', async () => {
    const user = await createUserService.execute({
      email: 'rvmelo@gamil.com',
      password: '123456',
    });

    const tool = await createToolService.execute({
      title: 'react',
      link: 'https://www.react.com',
      description: 'frontend framework',
      tags: ['frontend'],
    });

    await deleteToolService.execute({ id: tool.id });

    await expect(
      createOrderService.execute({
        user_id: user.id,
        order_tools: [
          {
            tool_id: tool.id,
            quantity: 5,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
