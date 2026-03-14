import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        language: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLessonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        language: true,
      },
    });

    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, languageId } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        languageId: languageId || null,
      },
      include: { language: true }
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    const lesson = await prisma.lesson.findUnique({ where: { id } });

    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    await prisma.lesson.delete({ where: { id } });

    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
