import { Router } from 'express';
import { generateExplanation, chatWithAI } from '../controllers/ai.controller';

const router = Router();

router.post('/explain', generateExplanation);
router.post('/chat', chatWithAI);

export default router;
