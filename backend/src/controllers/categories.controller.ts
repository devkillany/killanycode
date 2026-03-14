import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        language: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, languageId } = req.body;

    if (!name || !languageId) {
      res.status(400).json({ message: 'Name and languageId are required' });
      return;
    }

    const category = await prisma.category.create({
      data: { name, languageId },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    await prisma.category.delete({ where: { id } });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
