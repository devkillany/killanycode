import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categories.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getCategories);

// Protected routes (Admin only in real scenario)
router.post('/', authenticate, createCategory);
router.delete('/:id', authenticate, deleteCategory);

export default router;
