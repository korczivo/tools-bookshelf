import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import env from '../../env';
import { status } from '../../helpers/common';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  let jwtPayload;

  try {
    if (typeof token === 'string') {
      jwtPayload = <any>jwt.verify(token, env.secret);
    }
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(status.unauthorized).send({
      error: 'Unauthorized',
    });
    return;
  }

  const { user_id } = jwtPayload;
  const newToken = jwt.sign({ user_id }, env.secret, {
    expiresIn: '2h',
  });
  res.setHeader('authorization', newToken);

  next();
};

export { verifyToken };
