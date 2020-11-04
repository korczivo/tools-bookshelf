import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authController } from './controllers/auth';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', authController);

app.listen(5000).on('listening', () => {
  console.log(`🚀 are live on ${5000}`);
});

export default app;
