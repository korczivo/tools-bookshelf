import express from 'express';
import { createStory } from '../controllers/story';

const router = express.Router();

router.post('/story', createStory);

export { router as storyRouter };
