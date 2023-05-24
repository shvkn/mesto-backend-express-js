import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import cardRoutes from './routes/cards';

import globalErrorHandler from './shared/global-error-handler';
import authMiddleware from './middlewares/auth-middleware';

dotenv.config();
const { PORT = 3000, DB_URL = '' } = process.env;

const app = express();

mongoose.connect(DB_URL).catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

app.use(express.json());
app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been starter at port: ${PORT}`);
});
