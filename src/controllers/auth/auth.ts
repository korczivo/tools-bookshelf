import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { createUserService, loginService } from '../../services/auth';
import { hashPassword } from '../../helpers/auth';
import { Login, User } from '../../interfaces/user';

const createUser = async (req: Request, res: Response) => {
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
};

const login = async (req: Request, res: Response) => {
  const { email, password }: Login = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = {
    email,
    password,
  };

  const { response, status } = await loginService(user);

  return res.status(status).send(response);
};

export { createUser, login };
