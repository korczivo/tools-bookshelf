import { comparePassword, generateToken } from '../../helpers/auth';

import { PrismaClient } from '@prisma/client';
import { Login, User } from '../../interfaces/user';
import { Service } from '../../interfaces/common';
import { errorMessage, status } from '../../helpers/common';

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

const loginService = async (user: Login): Promise<Service> => {
  try {
    const findUser = await prisma.users.findOne({
      where: {
        email: user.email,
      },
    });

    if (!findUser) {
      errorMessage.data = 'Email does not exists.';

      return {
        response: errorMessage,
        status: status.success,
      };
    }

    const checkPassword = {
      hashedPassword: findUser.password,
      password: user.password,
    };

    if (!comparePassword(checkPassword)) {
      errorMessage.data = 'Email or password is incorrect.';

      return {
        response: errorMessage,
        status: status.bad,
      };
    }

    const token = generateToken(findUser.id);

    return {
      response: {
        data: token,
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

export { createUserService, loginService };
