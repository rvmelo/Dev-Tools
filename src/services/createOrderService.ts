import { classToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import AppError from '../errors/appError';

import Order from '../models/Order';
import Tool from '../models/Tool';
import User from '../models/User';

interface OrderTools {
  tool_id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  order_tools: OrderTools[];
}

class CreateOrderService {
  public async execute({ user_id, order_tools }: IRequest): Promise<Order> {
    const ordersRepository = getRepository(Order);
    const toolsRepository = getRepository(Tool);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    const toolIds = order_tools.map(orderTool => ({
      id: orderTool.tool_id,
    }));

    const foundTools = await toolsRepository.findByIds(toolIds);

    if (foundTools.length !== order_tools.length) {
      throw new AppError('all tools should be available on the database');
    }

    const order = ordersRepository.create({
      user_id,
      user,
      order_tools,
    });

    await ordersRepository.save(order);

    return { ...order, user: classToClass(order.user) };
  }
}

export default CreateOrderService;
