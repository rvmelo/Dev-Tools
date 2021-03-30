import { getRepository } from 'typeorm';
import Tool from '../models/Tool';

interface IRequest {
  tag: string;
}

class SearchToolsService {
  public async execute({ tag }: IRequest): Promise<Tool[]> {
    const toolsRepository = getRepository(Tool);

    const tools = await toolsRepository
      .createQueryBuilder('tools')
      .where('tools.tags like :tag', { tag: `%${tag}%` })
      .getMany();

    return tools;
  }
}

export default SearchToolsService;
