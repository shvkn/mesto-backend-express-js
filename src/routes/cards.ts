import { Router } from 'express';

import { getCards } from '../controllers/cards';

const router = Router();

router.get('/', getCards);

export default router;
