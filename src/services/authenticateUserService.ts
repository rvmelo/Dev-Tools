import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/appError';

interface IRequest {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError(' wrong user/password combinations');
    }

    const passwordMatched = await compare(password, user.password);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    if (!passwordMatched) {
      throw new AppError(' wrong user/password combination');
    }

    return { user: classToClass(user), token };
  }
}

export default AuthenticateUserService;
