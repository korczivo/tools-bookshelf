import env from '../../env';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { ComparePassword } from '../../interfaces/user';

const generateToken = (id: number) => {
  const token = jwt.sign(
    {
      user_id: id,
    },
    env.secret,
    { expiresIn: '3d' },
  );

  return token;
};

const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, salt);

const comparePassword = ({ hashedPassword, password }: ComparePassword) =>
  bcrypt.compareSync(password, hashedPassword);

export { comparePassword, generateToken, hashPassword };
