import 'reflect-metadata';
import './database';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import AppError from './errors/appError';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log('server started on port 3000'),
);
