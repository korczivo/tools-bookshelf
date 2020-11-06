import express from 'express';

import { userValidSchema } from '../helpers/validator';
import { createUser, login } from '../controllers/auth';

const router = express.Router();

router.post('/auth/register', userValidSchema, createUser);

router.post('/auth/login', login);

export { router as authRouter };
