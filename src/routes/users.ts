import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  createUser,
  getProfile,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const urlPattern = /(https?:\/\/)(www\.)?((?!\bwww\b)[-a-zA-Z0-9]+\.)+([a-zA-Z]+)([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+)?/;
const router = Router();

router.get('/', getUsers);

router.post('/', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(200),
      avatar: Joi.string()
        .regex(urlPattern),
    }),
}), createUser);

router.get('/me', getProfile);

router.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(200),
    })
    .unknown(true),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .regex(urlPattern)
        .required(),
    })
    .unknown(true),
}), updateAvatar);

router.get('/:userId', celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .alphanum()
        .length(24),
    }),
}), getUserById);

export default router;
