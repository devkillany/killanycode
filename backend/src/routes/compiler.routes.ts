import { Router } from 'express';
import { runCode } from '../controllers/compiler.controller';

const router = Router();

// In a real app we might want to authenticate this to prevent abuse, 
// for now keeping it open or using optional auth.
router.post('/run', runCode);

export default router;
