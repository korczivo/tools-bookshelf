import env from './env';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { authController } from './controllers/auth';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', authController);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;
