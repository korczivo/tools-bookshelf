import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { createUserService } from '../../services/auth';

import { hashPassword } from '../../helpers/auth';
import { userValidSchema } from '../../helpers/validator';

import { User } from '../../interfaces/user';

const authController = express.Router();

authController.post(
  '/auth/register',
  userValidSchema,
  async (req: Request, res: Response) => {
    const { email, password, name }: User = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = hashPassword(password);

    const user = {
      email,
      name,
      password: hashedPassword,
    };

    const { response, status } = await createUserService(user);

    return res.status(status).send(response);
  },
);

export { authController };
