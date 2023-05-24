import { Router } from 'express';

import {createUser, getUserById, getUsers, updateProfile} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);

export default router;
