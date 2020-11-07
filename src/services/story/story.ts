import { PrismaClient } from '@prisma/client';
import { Story } from '../../interfaces/story';
import { Service } from '../../interfaces/common';
import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

const createStoryService = async (story: Story): Promise<Service> => {
  try {
    const createStory = await prisma.story.create({
      data: story,
    });
    return {
      response: {
        data: createStory,
      },
      status: status.created,
    };
  } catch (e) {
    errorMessage.data = 'Operation was not successful.';

    return {
      response: errorMessage,
      status: status.error,
    };
  }
};
export { createStoryService };
