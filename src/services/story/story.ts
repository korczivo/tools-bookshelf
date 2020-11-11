import { PrismaClient } from '@prisma/client';

import { Story, StoryBase, StoryService } from '../../interfaces/story';
import { Service } from '../../interfaces/common';
import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

export const storyService = {
  getStories: async () => {
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
  createStory: async (story: Story): Promise<Service> => {
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
  findStory: async ({ id }: StoryBase) => {
    const item = await prisma.story.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return item;
  },
  getStory: async ({ id }: StoryBase) => {
    try {
      const story = await storyService.findStory({ id });

      if (!story) {
        return {
          response: {
            data: 'Store does not exists',
          },
          status: status.notfound,
        };
      }

      return {
        data: story,
      };
    } catch (e) {
      errorMessage.data = 'Operation was not successful.';

      return {
        response: errorMessage,
        status: status.error,
      };
    }
  },
  updateStory: async ({ story, id }: StoryService): Promise<Service> => {
    try {
      const getStory = await storyService.findStory({ id });

      if (!getStory) {
        return {
          response: {
            data: 'Store does not exists',
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
  },
  deleteStory: async ({ id }: StoryBase): Promise<Service> => {
    try {
      const getStory = await storyService.findStory({ id });

      if (!getStory) {
        return {
          response: {
            data: 'Store does not exists',
          },
          status: status.notfound,
        };
      }

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
