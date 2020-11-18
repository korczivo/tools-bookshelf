import { body } from 'express-validator';

export const createCommentValid = [
  body('content')
    .isLength({ min: 3 })
    .withMessage('Comment must be min. 3 chars long.'),
];
