import { Router } from 'express';
import { getLanguages, getLanguageById, createLanguage, deleteLanguage } from '../controllers/languages.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getLanguages);
router.get('/:id', getLanguageById);

// Protected routes (Admin only in real scenario)
router.post('/', authenticate, createLanguage);
router.delete('/:id', authenticate, deleteLanguage);

export default router;
