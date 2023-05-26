import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  getProfile,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';
import validateUrl from '../shared/validate-url';

const router = Router();

router.get('/', getUsers);

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
    }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .custom(validateUrl)
        .required(),
    }),
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
