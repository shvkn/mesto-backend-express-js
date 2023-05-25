import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

import { DefaultUser, ValidationMessages } from '../shared/constants';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DefaultUser.NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: DefaultUser.ABOUT,
  },
  avatar: {
    type: String,
    required: true,
    default: DefaultUser.AVATAR,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: ValidationMessages.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
});

export default mongoose.model<IUser>('user', userSchema);
