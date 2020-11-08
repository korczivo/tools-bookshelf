import express from 'express';
import { createStory } from '../controllers/story';
import { createStoryValid } from '../helpers/validator/story';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/story', verifyToken, createStoryValid, createStory);

export { router as storyRouter };
