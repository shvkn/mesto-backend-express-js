import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const { PORT = 3000, DB_URL = '' } = process.env;

const app = express();

mongoose.connect(DB_URL).catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has been starter at port: ${PORT}`);
});
