import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createUserService, updateUserService } from '../../services/auth';
import { userValidSchema } from '../../helpers/validator/auth';

const authController = express.Router();
const prisma = new PrismaClient();

authController.post('/auth/register', userValidSchema, async () => {
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
});

export { authController };
