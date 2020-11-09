import { StoryBase } from '../../interfaces/story';
import { PrismaClient } from '@prisma/client';
import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

export const isStoryExists = async ({ id }: StoryBase) => {
  try {
    return await prisma.story.findOne({
      where: {
        id: parseInt(id),
      },
    });
  } catch (e) {
    errorMessage.data = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};
