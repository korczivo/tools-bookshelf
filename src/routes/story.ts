import express from 'express';
import { createStory, updateStory } from '../controllers/story';
import { createStoryValid } from '../helpers/validator/story';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/story', verifyToken, createStoryValid, createStory);
router.patch('/story/:id', verifyToken, updateStory);

export { router as storyRouter };
