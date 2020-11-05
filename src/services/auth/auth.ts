import { PrismaClient } from '@prisma/client';

import { errorMessage, status } from '../../helpers/common';

import { User } from '../../interfaces/user';
import { Service } from '../../interfaces/common';

const prisma = new PrismaClient();

const createUserService = async (user: User): Promise<Service> => {
  try {
    const isUserExists = await prisma.users.findOne({
      where: {
        email: user.email,
      },
    });

    if (isUserExists) {
      errorMessage.data = 'Email already exists.';

      return {
        response: errorMessage,
        status: status.success,
      };
    }
    const createUser = await prisma.users.create({
      data: user,
    });

    return {
      response: {
        status: 'success',
        data: createUser,
      },
      status: status.success,
    };
  } catch (e) {
    errorMessage.data = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};

export { createUserService };
