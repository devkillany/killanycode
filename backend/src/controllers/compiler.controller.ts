import { Request, Response } from 'express';
import { executeCode } from '../services/compiler.service';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const runCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { language, code, version } = req.body;
    const userId = req.user?.id;

    if (!language || !code) {
      res.status(400).json({ message: 'Language and code are required' });
      return;
    }

    const output = await executeCode(language, code, version);

    // Record the run in database
    await prisma.compilerRun.create({
      data: {
        userId: userId || null,
        language,
        code,
        output: output?.run?.output || 'No output',
      }
    });

    res.status(200).json(output);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
