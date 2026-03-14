import { Router } from 'express';
import { getUsers, getUserById, deleteUser } from '../controllers/users.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all user routes
router.use(authenticate);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
