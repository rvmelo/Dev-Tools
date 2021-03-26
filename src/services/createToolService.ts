import { getRepository } from 'typeorm';
import Tool from '../models/Tool';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolService {
  public async execute({
    title,
    link,
    description,
    tags,
  }: IRequest): Promise<Tool> {
    const toolsRepository = getRepository(Tool);

    const tool = toolsRepository.create({
      title,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;
