import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createUserService, updateUserService } from '../../services/auth';

const authController = express.Router();
const prisma = new PrismaClient();

authController.post('/auth/register', async (req, res) => {
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
});

export { authController };
