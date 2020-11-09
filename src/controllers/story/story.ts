import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createStoryService, updateStoryService } from '../../services/story';

const createStory = async (req: Request, res: Response) => {
  const { title, description, stars, link } = req.body;
  const { user_id } = res.locals.jwtPayload;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const story = {
    title,
    description,
    stars,
    link,
    users: {
      connect: {
        id: user_id,
      },
    },
  };

  const { response, status } = await createStoryService(story);

  return res.status(status).send(response);
};

const updateStory = async (req: Request, res: Response) => {
  const { title, description, stars, link } = req.body;
  const { id } = req.params;
  const { user_id } = res.locals.jwtPayload;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const story = {
    title,
    description,
    stars,
    link,
    users: {
      connect: {
        id: user_id,
      },
    },
  };

  const { response, status } = await updateStoryService({ story, id });

  return res.status(status).send(response);
};

export { createStory, updateStory };
