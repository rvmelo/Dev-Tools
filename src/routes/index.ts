import { Router } from 'express';
import toolsRouter from './tools.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);

export default routes;
