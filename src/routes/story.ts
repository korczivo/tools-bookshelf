import express from 'express';
import { createStory } from '../controllers/story';
import { createStoryValid } from '../helpers/validator/story';

const router = express.Router();

router.post('/story', createStoryValid, createStory);

export { router as storyRouter };
