import { PrismaClient } from '@prisma/client';
import { Story, StoryService } from '../../interfaces/story';
import { Service } from '../../interfaces/common';
import { errorMessage, status } from '../../helpers/common';
import { isStoryExists } from './isStoryExists';

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

const updateStoryService = async ({
  story,
  id,
}: StoryService): Promise<Service> => {
  try {
    const findStory = await isStoryExists({ id });

    if (!findStory) {
      return {
        response: {
          data: 'Store does not exists.',
        },
        status: status.notfound,
      };
    }

    const updateStory = await prisma.story.update({
      data: story,
      where: {
        id: parseInt(id),
      },
    });

    return {
      response: {
        data: updateStory,
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

export { createStoryService, updateStoryService };
