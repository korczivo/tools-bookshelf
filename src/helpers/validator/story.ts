import { body } from 'express-validator';

export const createStoryValid = [
  body('title')
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be min. 3 chars long.'),
  body('description')
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be min. 3 chars long.'),
  body('stars').escape().isInt({ gt: 1, lt: 6 }).toInt(),
  body('link')
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be min. 3 chars long.'),
];
