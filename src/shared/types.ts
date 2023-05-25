import mongoose from 'mongoose';

export interface IJwtToken {
  _id: mongoose.Types.ObjectId | string;
}
