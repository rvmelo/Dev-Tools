import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserService from '../services/createUserService';

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(3).required(),
    },
  }),
  async (req, res) => {
    const { email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ email, password });

    return res.status(201).json(user);
  },
);

export default usersRouter;
