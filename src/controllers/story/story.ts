import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createStoryService } from '../../services/story';

const createStory = async (req: Request, res: Response) => {
  const { title, description, stars, link } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const story = {
    title,
    description,
    stars,
    link,
  };

  const { response, status } = await createStoryService(story);

  return res.status(status).send(response);
};

export { createStory };
