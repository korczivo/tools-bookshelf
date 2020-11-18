import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { commentsService } from '../../services/comments/comments';

const { createComment } = commentsService;

export const commentsController = {
  checkValid: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  createComment: async (req: Request, res: Response) => {
    const { content } = req.body;
    const { id } = req.params;
    const { user_id } = res.locals.jwtPayload;

    const comment = {
      story: {
        connect: {
          id: parseInt(id),
        },
      },
      users: {
        connect: {
          id: user_id,
        },
      },
      content,
    };

    const { response, status } = await createComment(comment);

    return res.status(status).send(response);
  },
};
