import env from './env';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { authRouter } from './routes/auth';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', authRouter);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;
