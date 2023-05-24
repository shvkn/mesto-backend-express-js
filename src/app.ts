import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import globalErrorHandler from './shared/global-error-handler';

dotenv.config();
const { PORT = 3000, DB_URL = '' } = process.env;

const app = express();

mongoose.connect(DB_URL).catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

app.use(express.json());

app.use('/users', userRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been starter at port: ${PORT}`);
});
