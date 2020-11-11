import express from 'express';
import { storyController } from '../controllers/story';
import { createStoryValid } from '../helpers/validator/story';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

const {
  getStory,
  getStories,
  createStory,
  updateStory,
  deleteStory,
  addLike,
} = storyController;

router.get('/story', verifyToken, getStories);
router.get('/story/:id', verifyToken, getStory);
router.post('/story', verifyToken, createStoryValid, createStory);
router.patch('/story/:id', verifyToken, updateStory);
router.delete('/story/:id', verifyToken, deleteStory);

router.post('/story/likes/:id', verifyToken, addLike);

export { router as storyRouter };
