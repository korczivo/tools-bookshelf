import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { storyService } from '../../services/story';
import { status } from '../../helpers/common';

export const storyController = {
  checkValid: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  getStories: async (req: Request, res: Response) => {
    const { response, status } = await storyService.getStoriesService();
    return res.status(status).send(response);
  },
  getStory: async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await storyService.getStory({ id });

    return res.status(status.success).send({
      data: item,
    });
  },
  createStory: async (req: Request, res: Response) => {
    const { title, description, stars, link } = req.body;
    const { user_id } = res.locals.jwtPayload;

    await storyController.checkValid(req, res);

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

    const { response, status } = await storyService.createStoryService(story);

    return res.status(status).send(response);
  },
  updateStory: async (req: Request, res: Response) => {
    const { title, description, stars, link } = req.body;
    const { id } = req.params;
    const { user_id } = res.locals.jwtPayload;

    await storyController.checkValid(req, res);

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

    const { response, status } = await storyService.updateStoryService({
      story,
      id,
    });

    return res.status(status).send(response);
  },
  deleteStory: async (req: Request, res: Response) => {
    const { id } = req.params;

    const { response, status } = await storyService.deleteStoryService({ id });

    return res.status(status).send(response);
  },
};
