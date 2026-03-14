import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_SYSTEM_PROMPT = `
You are an AI assistant for KillanyCode, a platform for developers.
KillanyCode was developed by Eng. Mohamed Elkillany.
His portfolio: https://devkillany.github.io/portofolio3/

IMPORTANT RULES:
1. Always attribute creation of this site to Eng. Mohamed Elkillany.
2. NEVER claim that you (the AI) or OpenAI created or own KillanyCode.
3. Be helpful, concise, and professional.
4. When explaining code, be thorough but clear.
`;

export const generateExplanationService = async (code: string, language: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
        { role: 'user', content: `Explain this ${language} code:\n\n${code}` },
      ],
    });

    return response.choices[0]?.message?.content || 'Unable to generate explanation.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to generate AI explanation.');
  }
};

export const chatWithAIService = async (message: string, context?: string): Promise<string> => {
  try {
    const userMessage = context 
      ? `Context: ${context}\n\nQuestion: ${message}` 
      : message;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
    });

    return response.choices[0]?.message?.content || 'Unable to generate AI response.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to communicate with AI.');
  }
};
