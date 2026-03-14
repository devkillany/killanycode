import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getSnippets = async (req: Request, res: Response): Promise<void> => {
  try {
    const snippets = await prisma.snippet.findMany({
      include: {
        language: true,
        category: true,
        user: { select: { id: true, name: true, email: true } }
      },
    });
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSnippetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      include: {
        language: true,
        category: true,
        user: { select: { id: true, name: true, email: true } }
      },
    });

    if (!snippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }

    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createSnippet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, code, languageId, categoryId, tags } = req.body;
    const userId = req.user?.id;

    if (!title || !code || !languageId || !categoryId) {
      res.status(400).json({ message: 'Title, code, languageId, and categoryId are required' });
      return;
    }

    const snippet = await prisma.snippet.create({
      data: {
        title,
        description: description || '',
        code,
        languageId,
        categoryId,
        tags: tags || [],
        userId,
      },
      include: { language: true, category: true }
    });

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteSnippet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    // Real app should verify if req.user.id == snippet.userId or user is admin
    const snippet = await prisma.snippet.findUnique({ where: { id } });

    if (!snippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }

    await prisma.snippet.delete({ where: { id } });

    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
