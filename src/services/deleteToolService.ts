import { getRepository } from 'typeorm';
import Tool from '../models/Tool';

interface IRequest {
  id: string;
}

class DeleteToolService {
  public async execute({ id }: IRequest): Promise<void> {
    const toolsRepository = getRepository(Tool);

    await toolsRepository.delete(id);
  }
}

export default DeleteToolService;
