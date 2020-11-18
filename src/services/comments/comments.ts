import { PrismaClient } from '@prisma/client';

import { Comment } from '../../interfaces/comments';
import { Service } from '../../interfaces/common';

import { errorMessage, status } from '../../helpers/common';

const prisma = new PrismaClient();

export const commentsService = {
  createComment: async (comment: Comment): Promise<Service> => {
    try {
      const createComment = await prisma.comments.create({
        data: comment,
      });

      return {
        response: {
          data: createComment,
        },
        status: status.created,
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
