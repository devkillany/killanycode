import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

const ADMIN_PASSWORD = '01000621479';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Special Admin Login condition as requested
    if (password === ADMIN_PASSWORD && email === 'admin@killanycode.com') {
      let admin = await prisma.user.findUnique({ where: { email } });
      
      if (!admin) {
        // Create the admin if not exists (in case seeding wasn't run)
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await prisma.user.create({
          data: {
            name: 'Eng. Mohamed Elkillany',
            email: 'admin@killanycode.com',
            password: hashedPassword,
          }
        });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: 'admin' },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      res.status(200).json({ token, user: { id: admin.id, name: admin.name, email: admin.email } });
      return;
    }

    // Standard user login
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
