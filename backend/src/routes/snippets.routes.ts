import { Router } from 'express';
import { getSnippets, getSnippetById, createSnippet, deleteSnippet } from '../controllers/snippets.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getSnippets);
router.get('/:id', getSnippetById);

// Protected routes
router.post('/', authenticate, createSnippet);
router.delete('/:id', authenticate, deleteSnippet);

export default router;
