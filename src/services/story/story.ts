import { PrismaClient } from '@prisma/client';

import { Story, StoryBase, StoryService } from '../../interfaces/story';
import { Service } from '../../interfaces/common';
import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

export const storyService = {
  getStoriesService: async () => {
    try {
      const getStories = await prisma.story.findMany({});

      return {
        response: {
          data: getStories,
        },
        status: status.error,
      };
    } catch (e) {
      errorMessage.data = 'Operation was not successful.';

      return {
        response: errorMessage,
        status: status.error,
      };
    }
  },
  createStoryService: async (story: Story): Promise<Service> => {
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
  },
  getStory: async ({ id }: StoryBase) => {
    try {
      const findStory = await prisma.story.findOne({
        where: {
          id: parseInt(id),
        },
      });

      if (!findStory) {
        return {
          response: {
            data: 'Store does not exists.',
          },
          status: status.notfound,
        };
      }

      return findStory;
    } catch (e) {
      errorMessage.data = 'Operation was not successful.';

      return {
        response: errorMessage,
        status: status.error,
      };
    }
  },
  updateStoryService: async ({ story, id }: StoryService): Promise<Service> => {
    try {
      await storyService.getStory({ id });

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
  },
  deleteStoryService: async ({ id }: StoryBase): Promise<Service> => {
    await storyService.getStory({ id });

    try {
      await prisma.story.delete({
        where: {
          id: parseInt(id),
        },
      });

      return {
        response: {
          data: 'Success',
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
  },
};
