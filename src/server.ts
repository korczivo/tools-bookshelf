import env from './env';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { authRouter } from './routes/auth';
import { storyRouter } from './routes/story';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/api/v1', authRouter);
app.use('/api/v1', storyRouter);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;
