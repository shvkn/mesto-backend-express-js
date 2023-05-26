import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .min(2)
        .required(),
    }),
}), createCard);

router.use('/:cardId', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .alphanum()
        .length(24),
    }),
}))
  .delete('/:cardId', deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', dislikeCard);

export default router;
