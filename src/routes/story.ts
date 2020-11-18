import express from 'express';
import { storyController } from '../controllers/story';
import { commentsController } from '../controllers/comments';
import { createStoryValid } from '../helpers/validator/story';
import { verifyToken } from '../middlewares/auth';
import { createCommentValid } from '../helpers/validator/comments';

const router = express.Router();

const {
  getStory,
  getStories,
  createStory,
  updateStory,
  deleteStory,
  addLike,
} = storyController;

const { createComment } = commentsController;

router.get('/story', verifyToken, getStories);
router.get('/story/:id', verifyToken, getStory);
router.post('/story', verifyToken, createStoryValid, createStory);
router.patch('/story/:id', verifyToken, updateStory);
router.delete('/story/:id', verifyToken, deleteStory);

router.post('/story/likes/:id', verifyToken, addLike);

router.post(
  '/story/comments/:id',
  verifyToken,
  createCommentValid,
  createComment,
);

export { router as storyRouter };
