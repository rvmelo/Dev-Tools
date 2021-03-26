import { getRepository } from 'typeorm';
import Tool from '../models/Tool';

class ListToolsService {
  public async execute(): Promise<Tool[]> {
    const toolsRepository = getRepository(Tool);

    const tools = await toolsRepository.find();

    return tools;
  }
}

export default ListToolsService;
