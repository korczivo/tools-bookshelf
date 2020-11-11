import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { storyService } from '../../services/story';
import { status } from '../../helpers/common';
import { addLikeServices } from '../../services/story/addLike';

const {
  getStory,
  getStories,
  updateStory,
  createStory,
  deleteStory,
} = storyService;

const { addLike } = addLikeServices;

export const storyController = {
  checkValid: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  getStories: async (req: Request, res: Response) => {
    const { response, status } = await getStories();
    return res.status(status).send(response);
  },
  getStory: async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await getStory({ id });

    return res.status(status.success).send(item);
  },
  createStory: async (req: Request, res: Response) => {
    const { title, description, link } = req.body;
    const { user_id } = res.locals.jwtPayload;

    await storyController.checkValid(req, res);

    const story = {
      title,
      description,
      link,
      users: {
        connect: {
          id: user_id,
        },
      },
    };

    const { response, status } = await createStory(story);

    return res.status(status).send(response);
  },
  updateStory: async (req: Request, res: Response) => {
    const { title, description, link } = req.body;
    const { id } = req.params;
    const { user_id } = res.locals.jwtPayload;

    await storyController.checkValid(req, res);

    const story = {
      title,
      description,
      link,
      users: {
        connect: {
          id: user_id,
        },
      },
    };

    const { response, status } = await updateStory({
      story,
      id,
    });

    return res.status(status).send(response);
  },
  deleteStory: async (req: Request, res: Response) => {
    const { id } = req.params;

    const { response, status } = await deleteStory({ id });

    return res.status(status).send(response);
  },
  addLike: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id } = res.locals.jwtPayload;

    const { response, status } = await addLike({ id, user_id });

    return res.status(status).send(response);
  },
};
