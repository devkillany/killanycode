import { Router } from 'express';
import { getLessons, getLessonById, createLesson, deleteLesson } from '../controllers/lessons.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);

// Protected admin routes
router.post('/', authenticate, createLesson);
router.delete('/:id', authenticate, deleteLesson);

export default router;
