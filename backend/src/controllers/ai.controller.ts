import { Request, Response } from 'express';
import { generateExplanationService, chatWithAIService } from '../services/ai.service';

export const generateExplanation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, language } = req.body;
    
    if (!code || !language) {
      res.status(400).json({ message: 'Code and language are required' });
      return;
    }

    const explanation = await generateExplanationService(code, language);
    
    res.status(200).json({ explanation });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      res.status(400).json({ message: 'Message is required' });
      return;
    }

    const reply = await chatWithAIService(message, context);
    
    res.status(200).json({ reply });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
