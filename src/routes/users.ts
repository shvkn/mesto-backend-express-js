import { Router } from 'express';

import {
  createUser,
  getProfile,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', getProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', getUserById);

export default router;
