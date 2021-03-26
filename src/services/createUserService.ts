import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import { classToClass } from 'class-transformer';
import User from '../models/User';
import AppError from '../errors/appError';

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkCustomerExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkCustomerExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return classToClass(user);
  }
}

export default CreateUserService;
