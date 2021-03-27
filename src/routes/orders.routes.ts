import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateOrderService from '../services/createOrderService';

const ordersRouter = Router();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', async (req, res) => {
  const { order_tools } = req.body;

  const createOrderService = new CreateOrderService();

  const userOrder = await createOrderService.execute({
    order_tools,
    user_id: req.user.id,
  });

  return res.status(201).json(userOrder);
});

export default ordersRouter;
