import { PrismaClient } from '@prisma/client';

import { storyService } from './story';

import { StoryBase } from '../../interfaces/story';
import { Service } from '../../interfaces/common';

import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

export const addLikeServices = {
  isStoryLiked: async ({ user_id }: StoryBase) => {
    return await prisma.users
      .findOne({
        where: {
          id: user_id,
        },
      })
      .likes();
  },
  addLike: async ({ id, user_id }: StoryBase): Promise<Service> => {
    try {
      const isLiked = await addLikeServices.isStoryLiked({
        id,
        user_id,
      });
      const getStory = await storyService.findStory({ id });

      if (!getStory) {
        return {
          response: {
            data: 'Store does not exists',
          },
          status: status.notfound,
        };
      }

      if (isLiked.length) {
        await prisma.$queryRaw(
          `DELETE FROM LIKES where user_id = ${user_id} AND story_id=${id}`,
        );

        await prisma.story.update({
          data: {
            stars: {
              decrement: 1,
            },
          },
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
      }

      await prisma.likes.create({
        data: {
          story: {
            connect: {
              id: parseInt(id),
            },
          },
          users: {
            connect: {
              id: parseInt(user_id),
            },
          },
        },
      });

      await prisma.story.update({
        data: {
          stars: {
            increment: 1,
          },
        },
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
      console.log(e);
      errorMessage.data = 'Operation was not successful.';

      return {
        response: errorMessage,
        status: status.error,
      };
    }
  },
};
