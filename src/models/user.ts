import mongoose from 'mongoose';
import validator from 'validator';

import { DefaultUser, ValidationMessages } from '../shared/constants';

interface IUser {
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
    default: DefaultUser.AVATAR,
    validate: {
      validator: validator.isURL,
      message: ValidationMessages.URL,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: ValidationMessages.EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model<IUser>('user', userSchema);
