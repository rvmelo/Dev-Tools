import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

//  services
import CreateToolService from '../services/createToolService';
import ListToolsService from '../services/listToolsService';
import SearchToolsService from '../services/searchToolsService';
import DeleteToolService from '../services/deleteToolService';

//   middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const toolsRouter = Router();

toolsRouter.use(ensureAuthenticated);

toolsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().trim().required(),
      link: Joi.string().trim().uri().required(),
      description: Joi.string().trim(),
      tags: Joi.array().required(),
    },
  }),
  async (req, res) => {
    const { title, link, description, tags } = req.body;

    const createToolService = new CreateToolService();

    const tool = await createToolService.execute({
      title,
      link,
      description,
      tags,
    });

    return res.status(201).json(tool);
  },
);

toolsRouter.get('/list', async (req, res) => {
  const listToolsService = new ListToolsService();

  const tools = await listToolsService.execute();

  return res.status(200).json(tools);
});

toolsRouter.get('/search', async (req, res) => {
  const { tag } = req.query;

  const searchToolsService = new SearchToolsService();

  const tools = await searchToolsService.execute({ tag: `${tag}` });

  return res.status(200).json(tools);
});

toolsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteToolService = new DeleteToolService();

  await deleteToolService.execute({ id });

  return res.status(204).json();
});

export default toolsRouter;
