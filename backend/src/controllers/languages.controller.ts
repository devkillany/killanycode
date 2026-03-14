import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getLanguages = async (req: Request, res: Response): Promise<void> => {
  try {
    const languages = await prisma.language.findMany({
      include: {
        categories: true,
      },
    });
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLanguageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const language = await prisma.language.findUnique({
      where: { id },
      include: {
        categories: true,
        snippets: true,
        lessons: true,
      },
    });

    if (!language) {
      res.status(404).json({ message: 'Language not found' });
      return;
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }

    const existingLanguage = await prisma.language.findUnique({ where: { name } });
    if (existingLanguage) {
      res.status(400).json({ message: 'Language already exists' });
      return;
    }

    const language = await prisma.language.create({
      data: { name, icon },
    });

    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const language = await prisma.language.findUnique({ where: { id } });

    if (!language) {
      res.status(404).json({ message: 'Language not found' });
      return;
    }

    await prisma.language.delete({ where: { id } });

    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
